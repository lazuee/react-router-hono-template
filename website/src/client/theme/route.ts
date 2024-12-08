import { createCookie, redirect, type ActionFunctionArgs } from "react-router";
import { IS_HOSTED, IS_PRODUCTION_BUILD, SITE_URL } from "~/lib/env";

import { safeRedirect } from "~/lib/utils";
import { isValidTheme, Theme } from ".";

const themeCookie = createCookie("theme", {
  maxAge: 60 * 60 * 24 * 365,
  httpOnly: true,
  sameSite: "lax",
  secrets: ["r0ut3r"],
  ...(IS_PRODUCTION_BUILD && IS_HOSTED && { domain: SITE_URL, secure: true }),
});

export const serializeTheme = async (theme: Theme) =>
  themeCookie.serialize({ theme });

export const getTheme = async (request: Request) => {
  const cookie = await themeCookie.parse(request.headers.get("Cookie"));
  return isValidTheme(cookie?.theme) ? (cookie.theme as Theme) : Theme.DARK;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const theme = formData.get("theme");
  if (!isValidTheme(theme)) throw new Response("Bad Request", { status: 400 });

  return redirect(safeRedirect(formData.get("redirect")), {
    headers: {
      "Set-Cookie": await serializeTheme(theme as Theme),
    },
  });
};
