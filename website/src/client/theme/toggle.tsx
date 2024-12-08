import { Form, useLocation } from "react-router";

import { Theme, useTheme } from ".";

export function ThemeToggle() {
  const { pathname, search } = useLocation();
  const theme = useTheme();
  const isDark = theme === Theme.DARK;
  const nextTheme = isDark ? Theme.LIGHT : Theme.DARK;

  return (
    <Form action="/theme" method="POST" replace preventScrollReset>
      <input type="hidden" name="redirect" value={`${pathname}${search}`} />
      <button
        name="theme"
        value={nextTheme}
        className={`w-full rounded-md border border-zinc-400 bg-zinc-200 p-2 px-4 text-xs font-medium text-zinc-800 transition-colors duration-200 ease-in-out hover:bg-zinc-300 sm:w-fit dark:border-zinc-500 dark:bg-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-600`}
      >
        {`${nextTheme} mode`}
      </button>
    </Form>
  );
}
