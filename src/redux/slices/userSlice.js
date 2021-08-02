import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setActivePopup } from './popupSlice';
import { fetchProducts } from './productsSlice';
import { resetLoading, setLoading } from './statusSlice';

export const registerUser = createAsyncThunk('user/register', async (registerData, { rejectWithValue, dispatch }) => {
	try {
		dispatch(setLoading());
		const response = await axios.post('/api/auth/register', registerData);
		const data = response.data;
		dispatch(setActivePopup(''));
		localStorage.setItem('user', JSON.stringify(data));
		dispatch(fetchProducts());
		return data;
	} catch (error) {
		return rejectWithValue(error.response.data.error);
	} finally {
		dispatch(resetLoading());
	}
});

export const loginUser = createAsyncThunk('user/login', async (loginData, { rejectWithValue, dispatch }) => {
	try {
		dispatch(setLoading());
		const response = await axios.post('/api/auth/login', loginData);
		const data = response.data;
		localStorage.setItem('user', JSON.stringify(data));
		dispatch(fetchProducts());
		dispatch(setActivePopup(''));
		return data;
	} catch (error) {
		return rejectWithValue(error.response.data.error);
	} finally {
		dispatch(resetLoading());
	}
});

const setError = (state, action) => {
	state.status = 'rejected';
	state.error = action.payload;
};

const setResolved = (state, { payload }) => {
	state.userData = payload;
	state.status = 'resolved';
	axios.defaults.headers.common['Authorization'] = `Bearer ${payload.toker}`;
};

const userSlice = createSlice({
	name: 'user',
	initialState: {
		userData: false,
		error: null,
		status: null
	},
	reducers: {
		setUser(state, action) {
			state.userData = action.payload;
		},
		logoutUser(state) {
			state.userData = false;
		},
		resetError(state) {
			state.error = null;
		}
	},
	extraReducers: {
		[registerUser.fulfilled]: setResolved,
		[registerUser.rejected]: setError,
		[loginUser.fulfilled]: setResolved,
		[loginUser.rejected]: setError
	}
});

export const { setUser, logoutUser, resetError } = userSlice.actions;

export default userSlice.reducer;
