/** disputesSlice.js - Holds the disputes list for the current user. Filled from services by hydrateStore. */
import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "disputes",
  initialState: { items: [] },
  reducers: { setDisputes: (s, a) => { s.items = a.payload; } },
});
export const { setDisputes } = slice.actions;
export default slice.reducer;
