/** userService.js - Broker/agent management (admin only). Passwords are demo-only plain text in storage. */
import { storage } from "./storage";
import { logService } from "./logService";
import { toPublicUser } from "./authService";
import { AppError, requireAdmin } from "./errors";
import { STORAGE_KEYS as K, AUDIT_ACTIONS as A, ROLES, USER_STATUS } from "@/config/constants";
import { uid, nowIso } from "@/utils/id";

const all = () => storage.get(K.users, []);

export const userService = {
  /** Admin gets everyone; others only themselves. */
  async list(user) {
    if (!user) return [];
    return (user.role === ROLES.ADMIN ? all() : all().filter((u) => u.id === user.id)).map(toPublicUser);
  },

  async add(admin, { name, loginId, phone, password, role = ROLES.BROKER }) {
    requireAdmin(admin);
    if (!name?.trim() || !loginId?.trim() || !password) throw new AppError("VALIDATION", "Name, login ID and password are required.");
    if (all().some((u) => u.loginId.toLowerCase() === loginId.trim().toLowerCase())) throw new AppError("DUPLICATE_LOGIN", "That login ID is already taken.");
    const user = { id: uid("u"), name: name.trim(), loginId: loginId.trim(), password, role, phone: phone || "", status: USER_STATUS.ACTIVE, createdAt: nowIso() };
    storage.set(K.users, [...all(), user]);
    logService.audit(admin.id, A.BROKER_ADDED, "user", { userId: user.id, loginId: user.loginId });
    return toPublicUser(user);
  },

  async setStatus(admin, userId, status) {
    requireAdmin(admin);
    if (userId === admin.id) throw new AppError("VALIDATION", "You can't disable your own account.");
    storage.set(K.users, all().map((u) => (u.id === userId ? { ...u, status } : u)));
    logService.audit(admin.id, status === USER_STATUS.ACTIVE ? A.BROKER_ENABLED : A.BROKER_DISABLED, "user", { userId });
  },

  async resetPassword(admin, userId, password) {
    requireAdmin(admin);
    if (!password || password.length < 6) throw new AppError("VALIDATION", "Password must be at least 6 characters.");
    storage.set(K.users, all().map((u) => (u.id === userId ? { ...u, password } : u)));
    logService.audit(admin.id, A.BROKER_PASSWORD_RESET, "user", { userId });
  },
};
