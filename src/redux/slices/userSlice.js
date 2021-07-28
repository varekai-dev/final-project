import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: false,
  },
  reducers: {
    setUser(state, action) {
      state.userData = action.payload;
    },
    logoutUser(state) {
      state.userData = false;
    },
  },
});

export default userSlice.reducer;

export const { setUser, logoutUser } = userSlice.actions;
