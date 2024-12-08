import { PassThrough } from "node:stream";

import {
  createReadableStreamFromReadable,
  readableStreamToString,
} from "@react-router/node";
import { isbot } from "isbot";

import {
  renderToPipeableStream,
  type RenderToPipeableStreamOptions,
} from "react-dom/server";

import { ServerRouter, type HandleDocumentRequestFunction } from "react-router";

const ABORT_DELAY = 5_000;

const handleDocumentRequest: HandleDocumentRequestFunction = (
  request,
  responseStatusCode,
  responseHeaders,
  routerContext,
  { env },
) => {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const userAgent = request.headers.get("user-agent");

    // Ensure requests from bots and SPA Mode renders wait for all content to load before responding
    // https://react.dev/reference/react-dom/server/renderToPipeableStream#waiting-for-all-content-to-load-for-crawlers-and-static-generation
    const readyOption: keyof RenderToPipeableStreamOptions =
      (userAgent && isbot(userAgent)) || routerContext.isSpaMode
        ? "onAllReady"
        : "onShellReady";

    const { pipe, abort } = renderToPipeableStream(
      <ServerRouter
        context={routerContext}
        url={request.url}
        abortDelay={ABORT_DELAY}
      />,
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();

          readableStreamToString(createReadableStreamFromReadable(body)).then(
            (html) => {
              responseHeaders.set("Content-Type", "text/html; charset=utf-8");

              if (env?.IS_PRODUCTION_BUILD) {
                html = applyPreloadScripts(html);
                html = applyPreloadCSS(html);
              }

              resolve(
                new Response(html, {
                  status: responseStatusCode,
                  headers: responseHeaders,
                }),
              );
            },
          );

          pipe(body);
        },
        onShellError(error: unknown) {
          reject(error);
        },
        onError(error: unknown) {
          // Log streaming rendering errors from inside the shell.  Don't log
          // errors encountered during initial shell rendering since they'll
          // reject and get logged in handleDocumentRequest.
          responseStatusCode = 500;
          if (shellRendered) console.error(error);
        },
      },
    );

    setTimeout(abort, ABORT_DELAY);
  });
};

export function applyPreloadScripts(html: string) {
  const preloaded = [
    ...html.matchAll(/<link[^>]+rel="preload"[^>]+href="([^"]+\.js)"/g),
  ].map((m) => m[1]);
  const modulePreloaded = [
    ...html.matchAll(/<link[^>]+rel="modulepreload"[^>]+href="([^"]+\.js)"/g),
  ].map((m) => m[1]);
  const missing = [
    ...(html.match(/<body[^>]*>([\s\S]*?)<\/body>/)?.[1] || "").matchAll(
      /\/assets\/[\w.-]+\.js/g,
    ),
  ].map((m) => m[0]);
  const assets = [...new Set([...preloaded, ...modulePreloaded, ...missing])];
  const links = assets
    .map((asset) => `<link rel="modulepreload" href="${asset}" as="script"/>`)
    .join("");

  html = html.replace(
    /<link[^>]+rel="modulepreload"[^>]+href="[^"]+\.js"[^>]*>/g,
    "",
  );
  html = html.replace(/<\/head>/, `${links}</head>`);
  html = html.replace(/\s*(nonce|async)=""(?=\s|>)/g, " $1");
  html = html.replace(
    /<script(?![^>]+\b(?:async|defer)\b)([^>]*)>/g,
    "<script$1 async>",
  );

  return html;
}

export function applyPreloadCSS(html: string) {
  const preloaded = [
    ...html.matchAll(/<link[^>]+rel="preload"[^>]+href="([^"]+\.css)"/g),
  ].map((m) => m[1]);
  const styles = [
    ...html.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+\.css)"/g),
  ].map((m) => m[1]);
  const missing = [
    ...(html.match(/<body[^>]*>([\s\S]*?)<\/body>/)?.[1] || "").matchAll(
      /\/assets\/[\w.-]+\.css/g,
    ),
  ].map((m) => m[0]);
  const assets = [...new Set([...preloaded, ...styles, ...missing])];
  let links = assets
    .map((asset) => `<link rel="preload" href="${asset}" as="style"/>`)
    .join("");
  links += assets
    .map((asset) => `<link rel="stylesheet" href="${asset}"/>`)
    .join("");

  html = html.replace(
    /<link[^>]+rel="preload"[^>]+href="[^"]+\.css"[^>]*>/g,
    "",
  );
  html = html.replace(
    /<link[^>]+rel="stylesheet"[^>]+href="[^"]+\.css"[^>]*>/g,
    "",
  );
  html = html.replace(/<\/head>/, `${links}</head>`);

  return html;
}

export default handleDocumentRequest;
