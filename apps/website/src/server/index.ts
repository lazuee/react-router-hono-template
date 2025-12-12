import { prettyJSON } from "hono/pretty-json";

import * as env from "~/env.server";
import { clientIp } from "./middleware/clientIp";
import routes from "./routes";
import type { ReactRouterHono } from "@lazuee/react-router-hono";

declare module "react-router" {
  export interface AppLoadContext {
    readonly env: typeof env;
  }
}

declare module "react-router" {
  interface LoaderFunctionArgs {
    context: AppLoadContext;
  }
}

const reactRouterHono: ReactRouterHono = {
  getLoadContext(ctx) {
    return {
      clientIp: ctx.var.clientIp,
      env,
    };
  },
  server(app) {
    app.use("*", prettyJSON({ space: 4 }), clientIp());
    app.route("/", routes);
  },
};

export default reactRouterHono;
