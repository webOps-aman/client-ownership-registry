/** seedUsers.js - Builds the demo users from .env (via env.js). Stored once on first load. */
import { ENV } from "@/config/env";
import { USER_STATUS } from "@/config/constants";

export const buildSeedUsers = () =>
  ENV.demoUsers.map((u, i) => ({
    id: `u_${u.loginId}`,
    name: u.name,
    loginId: u.loginId,
    password: u.password, // DEMO ONLY
    role: u.role,
    phone: `98000000${String(i + 1).padStart(2, "0")}`,
    status: USER_STATUS.ACTIVE,
    createdAt: new Date(Date.now() - 30 * 24 * 3600e3).toISOString(),
  }));
