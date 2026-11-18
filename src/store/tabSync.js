/** tabSync.js - When another browser tab changes our data (or logs in/out), reload the store here too. */
import { hydrateStore } from "./thunks";

export function startTabSync(store) {
  const onStorage = (e) => {
    if (e.key === null || e.key.startsWith("cor_v1_")) store.dispatch(hydrateStore());
  };
  window.addEventListener("storage", onStorage);
  return () => window.removeEventListener("storage", onStorage);
}
