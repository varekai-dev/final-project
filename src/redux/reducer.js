import { createReducer } from '@reduxjs/toolkit';
import { setActivePopup, setUser } from './actions';
import { initialState } from './initialState';

export const mainReducer = createReducer(initialState, {
	[setActivePopup]: (state, action) => {
		state.activePopup = action.payload;
	},
	[setUser]: (state, action) => {
		state.user = action.payload;
	}
});
