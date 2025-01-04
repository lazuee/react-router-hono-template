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

export const streamTimeout = 10_000;

const handleDocumentRequest: HandleDocumentRequestFunction = (
  request,
  responseStatusCode,
  responseHeaders,
  routerContext,
  _appLoadContext,
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
      <ServerRouter context={routerContext} url={request.url} />,
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);

          readableStreamToString(stream).then((html) => {
            responseHeaders.set("Content-Type", "text/html; charset=utf-8");

            resolve(
              new Response(html, {
                status: responseStatusCode,
                headers: responseHeaders,
              }),
            );
          });

          pipe(body);
        },
        onShellError(error: unknown) {
          reject(error);
        },
        onError(error: unknown) {
          responseStatusCode = 500;
          // Log streaming rendering errors from inside the shell.  Don't log
          // errors encountered during initial shell rendering since they'll
          // reject and get logged in handleDocumentRequest.
          if (shellRendered) {
            console.error(error);
          }
        },
      },
    );

    // Abort the rendering stream after the `streamTimeout` so it has tine to
    // flush down the rejected boundaries
    setTimeout(abort, streamTimeout + 1000);
  });
};

export default handleDocumentRequest;
