import { createSlice } from '@reduxjs/toolkit';

const popupSlice = createSlice({
	name: 'popup',
	initialState: {
		activePopup: null,
		activeProduct: null
	},
	reducers: {
		setActivePopup(state, action) {
			state.activePopup = action.payload;
		},
		setActiveProduct(state, action) {
			state.activeProduct = action.payload;
		}
	}
});

export default popupSlice.reducer;

export const { setActivePopup, setActiveProduct } = popupSlice.actions;
