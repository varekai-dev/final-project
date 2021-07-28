import { combineReducers, configureStore } from "@reduxjs/toolkit";
import popupSlice from "./slices/popupSlice";
import userSlice from "./slices/userSlice";

const rootReducer = combineReducers({
  user: userSlice,
  popup: popupSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});
