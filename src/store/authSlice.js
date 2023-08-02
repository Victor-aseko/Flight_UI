import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    email: "",
    level: "user",
  },
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
