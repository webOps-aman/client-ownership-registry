/** store.js - Store factory. Starts EMPTY (avoids server/client mismatch); StoreProvider hydrates it from services. */
import { configureStore } from "@reduxjs/toolkit";
import auth from "./slices/authSlice";
import users from "./slices/usersSlice";
import clients from "./slices/clientsSlice";
import logs from "./slices/logsSlice";
import disputes from "./slices/disputesSlice";

export const makeStore = () => configureStore({ reducer: { auth, users, clients, logs, disputes } });
