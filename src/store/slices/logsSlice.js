/** logsSlice.js - attempt, search and audit logs (admin gets all, others only their own searches/attempts). */
import { createSlice } from "@reduxjs/toolkit";

const logsSlice = createSlice({
  name: "logs",
  initialState: { attempts: [], searches: [], audit: [] },
  reducers: { setLogs: (s, a) => ({ ...s, ...a.payload }) },
});
export const { setLogs } = logsSlice.actions;
export default logsSlice.reducer;
