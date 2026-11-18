"use client";
/**
 * useRateLimit.js - Friendly UI side of the search limit. The service enforces the limit;
 * this hook shows how many searches are left and runs the cooldown countdown after a RATE_LIMITED error.
 */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/store/selectors";
import { ENV } from "@/config/env";

export function useRateLimit() {
  const user = useSelector(selectCurrentUser);
  const searches = useSelector((s) => s.logs.searches);
  const [now, setNow] = useState(() => Date.now());
  const [blockedUntil, setBlockedUntil] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const used = searches.filter((s) => s.searchedBy === user?.id && now - new Date(s.createdAt).getTime() < 60_000).length;
  const secondsLeft = Math.max(0, Math.ceil((blockedUntil - now) / 1000));
  return {
    limit: ENV.searchLimitPerMin,
    remaining: Math.max(0, ENV.searchLimitPerMin - used),
    secondsLeft,
    isLimited: secondsLeft > 0,
    startCooldown: (sec) => { setNow(Date.now()); setBlockedUntil(Date.now() + sec * 1000); },
  };
}
