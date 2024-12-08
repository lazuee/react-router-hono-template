import { Links, Meta, Scripts, ScrollRestoration } from "react-router";

import { useTheme } from "~/client/theme";
import { ThemeScript } from "~/client/theme/script";

export function RootLayout({ children }: React.PropsWithChildren) {
  const theme = useTheme();

  return (
    <html lang="en" data-theme={theme}>
      <head>
        <ThemeScript theme={theme} />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
