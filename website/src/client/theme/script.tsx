import { useIsomorphicLayoutEffect } from "usehooks-ts";

import { type Theme } from "./";

export const ThemeScript = ({ theme }: { theme: Theme }) => {
  useIsomorphicLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `document.documentElement.dataset.theme = ${JSON.stringify(theme)};`,
      }}
    />
  );
};
