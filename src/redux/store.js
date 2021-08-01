import { combineReducers, configureStore } from "@reduxjs/toolkit";
import favoritesSlice from "./slices/favoritesSlice";
import filterSlice from "./slices/filterSlice";
import popupSlice from "./slices/popupSlice";
import productsSlice from "./slices/productsSlice";
import userSlice from "./slices/userSlice";

const rootReducer = combineReducers({
  user: userSlice,
  popup: popupSlice,
  products: productsSlice,
  favorite: favoritesSlice,
  filter: filterSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});
