import { Server } from "miragejs";
import {
  handleSignup,
  handleResendOTP,
  handleVerifyOTP,
} from "./req-handlers/auth";
import { handleDashboard } from "./req-handlers/dashboard";
import { handleGroups, handleLeaveGroup, handleSearchedGroups } from "./req-handlers/groups";

export function setupRoutes(server: Server) {
  server.namespace = "api";

  // Authentication routes
  server.post("/signup", handleSignup, { timing: 2000 });
  server.post("/resend-otp", handleResendOTP, { timing: 1000 });
  server.post("/verify-otp", handleVerifyOTP, { timing: 1000 });

  // Dashboard route
  server.get("/dashboard", handleDashboard, { timing: 2000 });

  // Groups routes
  server.get("/groups/search/:query", handleSearchedGroups, { timing: 1000 });
  server.get("/groups/:pageNumber", handleGroups, { timing: 2000 });
  server.delete("/groups/:groupId/leave", handleLeaveGroup, { timing: 1000 });

  server.passthrough((request) => {
    // Let all non-API requests pass through
    return !request.url.includes("/api/");
  });
}
