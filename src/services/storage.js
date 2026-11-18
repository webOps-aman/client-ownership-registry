/**
 * storage.js - The ONLY file that touches localStorage. Safe on the server (returns fallbacks)
 * and never throws on bad JSON. Replace/ignore this file when a real backend is added.
 */
const PREFIX = "cor_v1_";
const ok = () => typeof window !== "undefined";

export const storage = {
  get(key, fallback = null) {
    if (!ok()) return fallback;
    try {
      const raw = window.localStorage.getItem(key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    if (!ok()) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error("Storage write failed", e);
    }
  },
  remove(key) {
    if (ok()) window.localStorage.removeItem(key);
  },
  /** Removes every key this app owns. */
  clearApp() {
    if (!ok()) return;
    Object.keys(window.localStorage).filter((k) => k.startsWith(PREFIX)).forEach((k) => window.localStorage.removeItem(k));
  },
};
