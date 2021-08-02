import { combineReducers, configureStore } from '@reduxjs/toolkit';
import favoritesSlice from './slices/favoritesSlice';
import filterSlice from './slices/filterSlice';
import popupSlice from './slices/popupSlice';
import productsSlice from './slices/productsSlice';
import userSlice from './slices/userSlice';
import statusSlice from './slices/statusSlice';
import singleProductSlice from './slices/singleProductSlice';

const rootReducer = combineReducers({
	user: userSlice,
	popup: popupSlice,
	products: productsSlice,
	favorite: favoritesSlice,
	filter: filterSlice,
	status: statusSlice,
	singleProduct: singleProductSlice
});

export const store = configureStore({
	reducer: rootReducer
});
