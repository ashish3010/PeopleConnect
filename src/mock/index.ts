import { createServer } from "miragejs";
import { setupRoutes } from "./mirage";

export const mirageConfig = {
  logging: true,
  timing: 400,
};

export function enableMirageServer() {
  const mockMode = process.env.NEXT_PUBLIC_MOCK_MODE;

  if (typeof window === "undefined" || mockMode !== "DEV") {
    return null;
  }

  const server = createServer({
    ...mirageConfig,
    routes() {
      setupRoutes(this);
    },
  });
  return server;
}

export function startMockServer() {
  if (process.env.NODE_ENV === "development") {
    return enableMirageServer();
  }
  return null;
}
