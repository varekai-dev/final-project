import { createSlice } from "@reduxjs/toolkit";

const statusSlice = createSlice({
  name: "status",
  initialState: {
    status: null,
  },
  reducers: {
    resetStatus(state) {
      state.status = null;
    },
    statusLoading(state) {
      state.status = "loading";
    },
    statusError(state) {
      state.status = "rejected";
    },
    statusResolved(state) {
      state.status = "resolved";
    },
  },
});

export const { resetStatus, statusLoading, statusError, statusResolved } =
  statusSlice.actions;

export default statusSlice.reducer;
