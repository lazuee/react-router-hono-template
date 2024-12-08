import { cloneElement } from "react";

import { useRouteLoaderData, type MetaFunction } from "react-router";

import { ThemeToggle } from "~/client/theme/toggle";

import { type Info } from "../+types/root";

export const meta: MetaFunction = () => {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
};

export default function Index() {
  const data = useRouteLoaderData<Info["loaderData"]>("root");
  if (!data) throw new Error("Failed to load data from 'root'");

  return (
    <div className="flex h-full items-center justify-center bg-gradient-to-b from-zinc-50 via-zinc-200 to-zinc-400 dark:from-zinc-700 dark:via-neutral-900 dark:to-zinc-900">
      <div className="flex h-full w-full flex-col items-center justify-center gap-6 border-0 border-solid border-zinc-300 bg-zinc-50 px-8 pb-8 pt-14 sm:gap-12 md:h-auto md:w-[620px] md:rounded-[2.5rem] md:border-[1px] dark:border-zinc-700 dark:bg-zinc-900">
        <header className="flex flex-col items-center gap-2">
          <h1 className="leading text-2xl font-bold text-zinc-800 dark:text-zinc-100">
            Welcome to <span className="sr-only">React Router</span>
          </h1>
          <div className="flex h-[100px] w-[301.39px] items-center sm:h-[144px] sm:w-[434px]">
            <img
              src="/logo-light.svg"
              alt="React Router"
              className="block w-full dark:hidden"
            />
            <img
              src="/logo-dark.svg"
              alt="React Router"
              className="hidden w-full dark:block"
            />
          </div>
        </header>
        <nav className="flex w-full flex-col items-center justify-center gap-4 rounded-3xl border border-zinc-200 p-6 dark:border-zinc-700">
          <div className="flex w-full flex-col justify-between gap-y-2 sm:flex-row sm:items-center">
            <div className="flex flex-col gap-x-1 gap-y-3 sm:flex-row sm:items-center">
              <p className="text-sm font-normal leading-4 text-zinc-800 dark:text-zinc-100">
                Get started by editing&nbsp;
              </p>
              <code className="rounded-md border border-zinc-300 bg-slate-200 px-2 py-1 font-mono text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                client/routes/home.tsx
              </code>
            </div>

            <ThemeToggle />
          </div>
          <ul className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
            {resources.map(({ href, text, icon }) => (
              <li key={href}>
                <a
                  className="group flex h-12 items-center gap-3 self-stretch rounded-xl border border-zinc-300 px-4 text-sm leading-normal text-zinc-700 hover:underline dark:border-zinc-700 dark:text-zinc-300"
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {cloneElement(icon, {
                    className:
                      "stroke-zinc-600 group-hover:stroke-current dark:stroke-zinc-300",
                  })}
                  <span className="w-32 overflow-hidden truncate">{text}</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-2 rounded-md text-xs text-zinc-600 dark:text-zinc-500">
            Hosted on{" "}
            {data.env?.IS_GITPOD_WORKSPACE
              ? "Gitpod Workspace"
              : data.env?.IS_GITHUB_CODESPACE
                ? "Github Codespace"
                : data.env?.IS_VERCEL
                  ? "Vercel"
                  : !data.env?.IS_LOCALHOST
                    ? "Cloud"
                    : "Localhost"}
          </p>
        </nav>
      </div>
    </div>
  );
}

const resources = [
  {
    href: "https://reactrouter.com/dev",
    text: "React Router Docs",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        className="stroke-gray-600 group-hover:stroke-current dark:stroke-gray-300"
      >
        <path
          d="M9.99981 10.0751V9.99992M17.4688 17.4688C15.889 19.0485 11.2645 16.9853 7.13958 12.8604C3.01467 8.73546 0.951405 4.11091 2.53116 2.53116C4.11091 0.951405 8.73546 3.01467 12.8604 7.13958C16.9853 11.2645 19.0485 15.889 17.4688 17.4688ZM2.53132 17.4688C0.951566 15.8891 3.01483 11.2645 7.13974 7.13963C11.2647 3.01471 15.8892 0.951453 17.469 2.53121C19.0487 4.11096 16.9854 8.73551 12.8605 12.8604C8.73562 16.9853 4.11107 19.0486 2.53132 17.4688Z"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    href: "https://rmx.as/discord",
    text: "Join Discord",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="20"
        viewBox="0 0 24 20"
        fill="none"
        className="stroke-gray-600 group-hover:stroke-current dark:stroke-gray-300"
      >
        <path
          d="M15.0686 1.25995L14.5477 1.17423L14.2913 1.63578C14.1754 1.84439 14.0545 2.08275 13.9422 2.31963C12.6461 2.16488 11.3406 2.16505 10.0445 2.32014C9.92822 2.08178 9.80478 1.84975 9.67412 1.62413L9.41449 1.17584L8.90333 1.25995C7.33547 1.51794 5.80717 1.99419 4.37748 2.66939L4.19 2.75793L4.07461 2.93019C1.23864 7.16437 0.46302 11.3053 0.838165 15.3924L0.868838 15.7266L1.13844 15.9264C2.81818 17.1714 4.68053 18.1233 6.68582 18.719L7.18892 18.8684L7.50166 18.4469C7.96179 17.8268 8.36504 17.1824 8.709 16.4944L8.71099 16.4904C10.8645 17.0471 13.128 17.0485 15.2821 16.4947C15.6261 17.1826 16.0293 17.8269 16.4892 18.4469L16.805 18.8725L17.3116 18.717C19.3056 18.105 21.1876 17.1751 22.8559 15.9238L23.1224 15.724L23.1528 15.3923C23.5873 10.6524 22.3579 6.53306 19.8947 2.90714L19.7759 2.73227L19.5833 2.64518C18.1437 1.99439 16.6386 1.51826 15.0686 1.25995ZM16.6074 10.7755L16.6074 10.7756C16.5934 11.6409 16.0212 12.1444 15.4783 12.1444C14.9297 12.1444 14.3493 11.6173 14.3493 10.7877C14.3493 9.94885 14.9378 9.41192 15.4783 9.41192C16.0471 9.41192 16.6209 9.93851 16.6074 10.7755ZM8.49373 12.1444C7.94513 12.1444 7.36471 11.6173 7.36471 10.7877C7.36471 9.94885 7.95323 9.41192 8.49373 9.41192C9.06038 9.41192 9.63892 9.93712 9.6417 10.7815C9.62517 11.6239 9.05462 12.1444 8.49373 12.1444Z"
          strokeWidth="1.5"
        />
      </svg>
    ),
  },
];
