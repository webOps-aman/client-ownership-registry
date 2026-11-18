"use client";
/** StoreProvider.jsx - Creates the store once, hydrates it from localStorage, and keeps tabs in sync. */
import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { makeStore } from "./store";
import { hydrateStore } from "./thunks";
import { startTabSync } from "./tabSync";

export default function StoreProvider({ children }) {
  const ref = useRef(null);
  if (!ref.current) ref.current = makeStore();

  useEffect(() => {
    ref.current.dispatch(hydrateStore());
    return startTabSync(ref.current);
  }, []);

  return <Provider store={ref.current}>{children}</Provider>;
}
