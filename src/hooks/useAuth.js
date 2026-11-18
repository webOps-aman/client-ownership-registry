"use client";
/** useAuth.js - Session info plus signIn/signOut. Components never touch the store or services for auth directly. */
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser, selectHydrated } from "@/store/selectors";
import { login, logout } from "@/store/thunks";
import { homeForRole } from "@/config/navigation";

export function useAuth() {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const hydrated = useSelector(selectHydrated);
  return {
    user,
    role: user?.role ?? null,
    hydrated,
    isAuthenticated: !!user,
    homePath: user ? homeForRole(user.role) : "/login",
    /** Resolves to the user, or throws { code, message }. */
    signIn: (loginId, password) => dispatch(login({ loginId, password })).unwrap(),
    signOut: () => dispatch(logout()).unwrap(),
  };
}
