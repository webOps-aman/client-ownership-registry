/**
 * thunks.js - Every action the UI can dispatch. Each thunk calls a SERVICE (never storage directly),
 * then re-reads the data into Redux with hydrateStore, so the UI always matches what was saved.
 * Components use: dispatch(thunk(args)).unwrap()  -> result, or throws { code, message, ... }.
 */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "@/services/authService";
import { userService } from "@/services/userService";
import { clientService } from "@/services/clientService";
import { logService } from "@/services/logService";
import { disputeService } from "@/services/disputeService";
import { seedService } from "@/services/seedService";
import { serializeError } from "@/services/errors";
import { setUser, setHydrated } from "./slices/authSlice";
import { setUsers } from "./slices/usersSlice";
import { setClients } from "./slices/clientsSlice";
import { setLogs } from "./slices/logsSlice";
import { setDisputes } from "./slices/disputesSlice";

/** Loads everything the current user may see from the services into Redux. */
export const hydrateStore = createAsyncThunk("app/hydrate", async (_, { dispatch }) => {
  try {
    await seedService.ensureSeeded();
    const user = await authService.restore();
    dispatch(setUser(user));
    dispatch(setUsers(await userService.list(user)));
    dispatch(setClients(await clientService.list(user)));
    dispatch(setLogs(await logService.list(user)));
    dispatch(setDisputes(await disputeService.list(user)));
  } catch (error) {
    // A storage/bootstrap error should not leave every route stuck on its loading skeleton.
    console.error("App hydration failed", error);
    dispatch(setUser(null));
  } finally {
    dispatch(setHydrated());
  }
});

/** Builds a thunk: fn(arg, currentUser) -> result. Errors become plain objects; success refreshes the store. */
const action = (name, fn) =>
  createAsyncThunk(name, async (arg, { getState, dispatch, rejectWithValue }) => {
    try {
      const result = await fn(arg, getState().auth.user);
      await dispatch(hydrateStore());
      return result;
    } catch (e) {
      return rejectWithValue(serializeError(e));
    }
  });

// Auth
export const login = action("auth/login", ({ loginId, password }) => authService.login(loginId, password));
export const logout = action("auth/logout", (_, user) => authService.logout(user?.id));

// Clients
export const checkClient = action("clients/check", (phone, user) => clientService.check(user, phone));
export const registerClient = action("clients/register", (form, user) => clientService.register(user, form));
export const updateClient = action("clients/update", ({ id, changes, reason }, user) => clientService.update(user, id, changes, reason));
export const transferOwnership = action("clients/transfer", ({ id, newOwnerId, reason }, user) => clientService.transferOwnership(user, id, newOwnerId, reason));

// Brokers
export const addBroker = action("users/add", (data, user) => userService.add(user, data));
export const setBrokerStatus = action("users/status", ({ userId, status }, user) => userService.setStatus(user, userId, status));
export const resetBrokerPassword = action("users/password", ({ userId, password }, user) => userService.resetPassword(user, userId, password));

// Disputes
export const createDispute = action("disputes/create", (data, user) => disputeService.create(user, data));
export const resolveDispute = action("disputes/resolve", ({ id, outcome, reason }, user) => disputeService.resolve(user, id, { outcome, reason }));

// Demo
export const resetDemoData = action("demo/reset", (_, user) => seedService.reset(user));
