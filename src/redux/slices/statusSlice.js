import { createSlice } from '@reduxjs/toolkit';

const statusSlice = createSlice({
	name: 'status',
	initialState: {
		loading: false
	},
	reducers: {
		resetLoading(state) {
			state.loading = false;
		},
		setLoading(state) {
			state.loading = true;
		}
	}
});

export const { resetLoading, setLoading } = statusSlice.actions;

export default statusSlice.reducer;
