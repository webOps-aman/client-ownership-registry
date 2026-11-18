/** authSlice.js - Logged-in user (never holds a password) and the `hydrated` flag guards wait for. */
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, hydrated: false },
  reducers: {
    setUser: (s, a) => { s.user = a.payload; },
    setHydrated: (s) => { s.hydrated = true; },
  },
});
export const { setUser, setHydrated } = authSlice.actions;
export default authSlice.reducer;
