import { configureStore } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import { mainReducer } from './reducer';

export const store = configureStore({
	reducer: mainReducer,
	preloadedState: initialState
});
