import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { resetLoading, setLoading } from './statusSlice';

export const fetchSingleProduct = createAsyncThunk('products/fetchSingleProduct', async (itemsNumber, { rejectWithValue, getState, dispatch }) => {
	try {
		dispatch(setLoading());
		const response = await axios(`/api/products?offset=${itemsNumber}&limit=12`);
		const data = response.data;
		const oldProductsList = getState().products.productsList;
		console.log(oldProductsList);
		const newProductsList = [...oldProductsList, ...data];
		return newProductsList;
	} catch (error) {
		return rejectWithValue(error.response.data.error);
	} finally {
		dispatch(resetLoading());
	}
});

const singleProductSlice = createSlice({
	name: 'singleProduct',
	initialState: {
		product: null
	},
	reducers: {
		setProduct(state, action) {
			state.product = action.payload;
		}
	}
});

export default singleProductSlice.reducer;

export const { setProduct } = singleProductSlice.actions;
