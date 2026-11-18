/** constants.js - App-wide constant values (roles, sources, statuses, audit actions, storage keys). */
export const ROLES = { ADMIN: "admin", AGENT: "agent", BROKER: "broker" };
export const SOURCES = { BROKER: "Broker", DIRECT: "Direct" };
export const USER_STATUS = { ACTIVE: "active", DISABLED: "disabled" };
export const DISPUTE_STATUS = { OPEN: "open", RESOLVED: "resolved" };

export const AUDIT_ACTIONS = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  CLIENT_SEARCHED: "CLIENT_SEARCHED",
  SEARCH_RATE_LIMITED: "SEARCH_RATE_LIMITED",
  CLIENT_REGISTERED: "CLIENT_REGISTERED",
  DUPLICATE_ATTEMPT: "DUPLICATE_ATTEMPT",
  CLIENT_EDITED: "CLIENT_EDITED",
  OWNERSHIP_TRANSFERRED: "OWNERSHIP_TRANSFERRED",
  BROKER_ADDED: "BROKER_ADDED",
  BROKER_ENABLED: "BROKER_ENABLED",
  BROKER_DISABLED: "BROKER_DISABLED",
  BROKER_PASSWORD_RESET: "BROKER_PASSWORD_RESET",
  DISPUTE_CREATED: "DISPUTE_CREATED",
  DISPUTE_RESOLVED: "DISPUTE_RESOLVED",
  DEMO_RESET: "DEMO_RESET",
};

// Versioned keys so a future data-format change can migrate cleanly.
export const STORAGE_KEYS = {
  session: "cor_v1_session",
  users: "cor_v1_users",
  clients: "cor_v1_clients",
  attempts: "cor_v1_attempts",
  searches: "cor_v1_searches",
  audit: "cor_v1_audit",
  disputes: "cor_v1_disputes",
  meta: "cor_v1_meta",
};

export const LOG_LIMIT = 2000; // newest entries kept per log (protects the ~5 MB localStorage limit)
export const PAGE_SIZE = 10;

/** Shown on the login page footer. */
export const DEVELOPER = { name: "ravan.ai", url: "https://www.ravan.ai/" };
