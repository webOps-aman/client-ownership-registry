/** authService.js - Demo login against stored users. Session = user id in localStorage. */
import { storage } from "./storage";
import { logService } from "./logService";
import { AppError } from "./errors";
import { STORAGE_KEYS as K, AUDIT_ACTIONS as A, USER_STATUS } from "@/config/constants";

export const toPublicUser = ({ password, ...rest }) => rest; // never expose the password to the store

const users = () => storage.get(K.users, []);

export const authService = {
  async login(loginId, password) {
    if (!loginId?.trim() || !password) throw new AppError("VALIDATION", "Enter your User ID and password.");
    const user = users().find((u) => u.loginId === loginId.trim() && u.password === password);
    if (!user) throw new AppError("INVALID_LOGIN", "Invalid ID or password.");
    if (user.status !== USER_STATUS.ACTIVE) throw new AppError("DISABLED", "This account is disabled. Contact the admin.");
    storage.set(K.session, { userId: user.id });
    logService.audit(user.id, A.LOGIN, "session", { loginId: user.loginId });
    return toPublicUser(user);
  },

  async logout(userId) {
    if (userId) logService.audit(userId, A.LOGOUT, "session");
    storage.remove(K.session);
  },

  /** Returns the saved session's user, or null (also null if the user was disabled meanwhile). */
  async restore() {
    const s = storage.get(K.session);
    const user = s && users().find((u) => u.id === s.userId);
    return user && user.status === USER_STATUS.ACTIVE ? toPublicUser(user) : null;
  },
};
