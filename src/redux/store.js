import { combineReducers, configureStore } from "@reduxjs/toolkit";

import favoritesSlice from "./slices/favoritesSlice";
import filterSlice from "./slices/filterSlice";
import popupSlice from "./slices/popupSlice";
import productsSlice from "./slices/productsSlice";
import userSlice from "./slices/userSlice";
import statusSlice from "./slices/statusSlice";
import singleProductSlice from "./slices/singleProductSlice";
import ordersSlice from "./slices/ordersSlice";
import notificationSlice from "./slices/notificationSlice";

const rootReducer = combineReducers({
  user: userSlice,
  popup: popupSlice,
  products: productsSlice,
  favorite: favoritesSlice,
  filter: filterSlice,
  status: statusSlice,
  singleProduct: singleProductSlice,
  orders: ordersSlice,
  notification: notificationSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});
