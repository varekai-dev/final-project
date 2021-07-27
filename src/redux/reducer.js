import { createReducer } from "@reduxjs/toolkit";
import { setActivePopup } from "./actions";
import { initialState } from "./initialState";

export const popupReducer = createReducer(initialState, {
  [setActivePopup]: (state, action) => {
    state.activePopup = action.payload;
  },
});
