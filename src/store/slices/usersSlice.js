/** usersSlice.js - Holds the users list for the current user. Filled from services by hydrateStore. */
import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "users",
  initialState: { items: [] },
  reducers: { setUsers: (s, a) => { s.items = a.payload; } },
});
export const { setUsers } = slice.actions;
export default slice.reducer;
