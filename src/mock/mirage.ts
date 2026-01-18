import { Server } from "miragejs";
import {
  handleSignup,
  handleResendOTP,
  handleVerifyOTP,
} from "./req-handlers/auth";

export function setupRoutes(server: Server) {
  server.namespace = "api";

  // Authentication routes
  server.post("/signup", handleSignup, { timing: 2000 });
  server.post("/resend-otp", handleResendOTP, { timing: 1000 });
  server.post("/verify-otp", handleVerifyOTP, { timing: 1000 });

  server.passthrough((request) => {
    // Let all non-API requests pass through
    return !request.url.includes("/api/");
  });
}
