import * as reactDomServer from "react-dom/server";
import * as bunEntry from "./entry.server.bun";
import * as nodeEntry from "./entry.server.node";

const isNode = "renderToPipeableStream" in reactDomServer;
const entry = isNode ? nodeEntry : bunEntry;

export const streamTimeout = entry.streamTimeout;
export default entry.default;
