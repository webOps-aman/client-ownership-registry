/** clientsSlice.js - Holds the clients list for the current user. Filled from services by hydrateStore. */
import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "clients",
  initialState: { items: [] },
  reducers: { setClients: (s, a) => { s.items = a.payload; } },
});
export const { setClients } = slice.actions;
export default slice.reducer;
