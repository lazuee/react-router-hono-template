export function loader() {
  throw new Response("Page not found", { status: 404 });
}

export default () => null;
