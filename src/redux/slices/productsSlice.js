import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { resetLoading, setLoading } from './statusSlice';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (_, { rejectWithValue, dispatch, getState }) => {
	const sortBy = getState().filter.sortBy;

	try {
		dispatch(setLoading());
		const response = await axios(`/api/products?offset=0&limit=12${sortBy ? `&sortBy=${sortBy.value}` : ''}`);
		const data = response.data;
		dispatch(setProducts(data));
		return data;
	} catch (error) {
		return rejectWithValue(error.response.data.error);
	} finally {
		dispatch(resetLoading());
	}
});

export const fetchMoreProducts = createAsyncThunk('products/fetchMoreProducts', async (itemsNumber, { rejectWithValue, getState, dispatch }) => {
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

const setError = (state, action) => {
	state.error = action.payload;
};

const setResolved = (state, { payload }) => {
	state.productsList = payload;
};

const productsSlice = createSlice({
	name: 'products',
	initialState: {
		productsList: [],
		status: null,
		error: null
	},
	reducers: {
		setProducts(state, action) {
			state.productsList = action.payload;
		},
		loadMoreProducts(state, action) {
			state.productsList = action.payload;
		}
	},
	extraReducers: {
		[fetchProducts.fulfilled]: setResolved,
		[fetchProducts.rejected]: setError,
		[fetchMoreProducts.fulfilled]: setResolved,
		[fetchMoreProducts.rejected]: setError
	}
});

export const { setProducts, loadMoreProducts } = productsSlice.actions;

export default productsSlice.reducer;
