/** errors.js - Errors thrown by services carry a `code` so the UI can react (DUPLICATE, RATE_LIMITED...). */
export class AppError extends Error {
  constructor(code, message, extra = {}) {
    super(message);
    this.code = code;
    Object.assign(this, extra);
  }
}

/** Converts any error into a plain object Redux can hold. */
export const serializeError = (e) => ({
  code: e.code || "UNKNOWN",
  message: e.message || "Something went wrong.",
  owner: e.owner,
  retryAfterSec: e.retryAfterSec,
  fields: e.fields,
});

export const requireAdmin = (user) => {
  if (user?.role !== "admin") throw new AppError("FORBIDDEN", "Only an admin can do this.");
};
export const requireReason = (reason) => {
  if (!reason || !reason.trim()) throw new AppError("VALIDATION", "A reason is required.");
};
