import { createSlice } from "@reduxjs/toolkit";

const popupSlice = createSlice({
  name: "popup",
  initialState: {
    activePopup: "test",
  },
  reducers: {
    setActivePopup(state, action) {
      state.activePopup = action.payload;
    },
  },
});

export default popupSlice.reducer;

export const { setActivePopup } = popupSlice.actions;
