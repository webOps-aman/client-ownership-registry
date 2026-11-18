/**
 * logService.js - Attempt, search and audit logs. Newest entries first, capped at LOG_LIMIT.
 * Non-admin users only ever receive their own searches/attempts and no audit log.
 */
import { storage } from "./storage";
import { STORAGE_KEYS as K, LOG_LIMIT, ROLES } from "@/config/constants";
import { uid, nowIso } from "@/utils/id";

const read = (key) => storage.get(K[key], []);
const push = (key, entry) => {
  storage.set(K[key], [entry, ...read(key)].slice(0, LOG_LIMIT));
  return entry;
};

export const logService = {
  audit: (userId, action, entity, details = {}) => push("audit", { id: uid("au"), userId, action, entity, details, createdAt: nowIso() }),
  search: (phone, searchedBy, found) => push("searches", { id: uid("se"), phone, searchedBy, found, createdAt: nowIso() }),
  attempt: (phone, attemptedBy, existingClientId) => push("attempts", { id: uid("at"), phone, attemptedBy, existingClientId, createdAt: nowIso() }),

  /** Searches by one user inside the last `windowMs` (newest first). Used for rate limiting. */
  recentSearches: (userId, windowMs) => read("searches").filter((s) => s.searchedBy === userId && Date.now() - new Date(s.createdAt).getTime() < windowMs),

  async list(user) {
    if (!user) return { attempts: [], searches: [], audit: [] };
    if (user.role === ROLES.ADMIN) return { attempts: read("attempts"), searches: read("searches"), audit: read("audit") };
    return {
      attempts: read("attempts").filter((a) => a.attemptedBy === user.id),
      searches: read("searches").filter((s) => s.searchedBy === user.id),
      audit: [],
    };
  },
};
