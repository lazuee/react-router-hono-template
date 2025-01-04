import { isRouteErrorResponse, useRouteError } from "react-router";

import { canUseDOM } from "~/client/lib/util";

export function ErrorLayout() {
  const parsed = parsedError();
  if (!parsed.isClient) return null;

  const errorMessage = parsed.isRouteError
    ? `${parsed.error.status} - ${parsed.error.data || parsed.error.statusText}`
    : parsed.isError
      ? "Uncaught Exception"
      : "Unknown Error";

  const errorStack = parsed.isError && parsed.error?.stack;

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 py-12 sm:px-6 lg:px-8 dark:bg-zinc-900">
      <div className="flex w-[90%] max-w-5xl flex-col gap-y-8">
        <h1 className="mt-6 text-center text-3xl font-extrabold text-red-600 dark:text-red-400">
          {errorMessage}
        </h1>
        {errorStack && (
          <>
            <p className="text-center text-lg text-zinc-500 dark:text-zinc-400">
              An error occurred while loading this page.
            </p>
            <pre className="mt-4 overflow-auto rounded-lg bg-black p-4 text-white shadow-lg dark:bg-zinc-800">
              <code>{errorStack}</code>
            </pre>
          </>
        )}
      </div>
    </div>
  );
}

export function parsedError() {
  const isClient = canUseDOM();
  const error = useRouteError();

  if (isClient) {
    if (isRouteErrorResponse(error)) {
      return { error, isClient, isRouteError: true };
    } else if (error instanceof Error) {
      return { error, isClient, isError: true };
    } else {
      return { error: error as Error, isClient, isUnknown: true };
    }
  }

  return {
    error: error as Error,
    isClient: false,
    isServer: true,
    isError: true,
  };
}
