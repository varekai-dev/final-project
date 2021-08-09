import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
	name: 'notification',
	initialState: {
		notification: null
	},
	reducers: {
		addNotification(state, action) {
			state.notification = action.payload;
		}
	}
});

export default notificationSlice.reducer;

export const { addNotification } = notificationSlice.actions;
