import { configureStore } from "@reduxjs/toolkit";
import { initialState } from "./initialState";
import { popupReducer } from "./reducer";

export const store = configureStore({
  reducer: popupReducer,
  preloadedState: initialState,
});
