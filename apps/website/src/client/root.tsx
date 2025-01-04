import "./styles/tailwind.css";

import { Outlet, type ShouldRevalidateFunctionArgs } from "react-router";
import { type Route } from "./+types/root";
import { ErrorLayout } from "./components/layout/error";

import { RootLayout } from "./components/layout/root";
import { getTheme } from "./theme/route";

export function shouldRevalidate({
  formData,
  defaultShouldRevalidate,
}: ShouldRevalidateFunctionArgs) {
  return formData?.get("theme") ? true : defaultShouldRevalidate;
}

export async function loader({ request }: Route.ClientLoaderArgs) {
  const theme = await getTheme(request);

  return {
    theme,
  };
}

export default function App() {
  return (
    <RootLayout>
      <Outlet />
    </RootLayout>
  );
}

export function ErrorBoundary() {
  return (
    <RootLayout>
      <ErrorLayout />
    </RootLayout>
  );
}
