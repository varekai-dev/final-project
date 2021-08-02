import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setProducts } from './productsSlice';
import { resetLoading, setLoading } from './statusSlice';

export const fetchCategories = createAsyncThunk('filter/fetchCategories', async (_, { rejectWithValue, dispatch }) => {
	try {
		dispatch(setLoading());
		const response = await axios(`/api/categories`);
		const filters = response.data.map((filter) => ({
			value: filter.name,
			label: filter.name,
			id: filter.id
		}));
		return filters;
	} catch (error) {
		return rejectWithValue(error.response.data.error);
	} finally {
		dispatch(resetLoading());
	}
});

export const fetchProductsBySearch = createAsyncThunk('filter/fetchProductsBySearch', async (_, { rejectWithValue, dispatch, getState }) => {
	const searchValue = getState().filter.searchValue;
	try {
		dispatch(setLoading());
		const response = await axios(`/api/products/search?keywords=${searchValue}&offset=0&limit=16`);
		dispatch(setProducts(response.data));
	} catch (error) {
		return rejectWithValue(error.response.data.error);
	} finally {
		dispatch(resetLoading());
	}
});

export const fetchProductsByCategory = createAsyncThunk('filter/fetchProductsByCategory', async (_, { rejectWithValue, dispatch, getState }) => {
	const activeCategory = getState().filter.activeCategory.id;
	try {
		dispatch(setLoading());
		const response = await axios(`/api/categories${activeCategory ? `/${activeCategory}/products` : ''}`);
		dispatch(setProducts(response.data));
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

const filterSlice = createSlice({
	name: 'filter',
	initialState: {
		sortBy: null,
		activeCategory: null,
		categories: [],
		status: null,
		error: null,
		searchValue: ''
	},
	reducers: {
		chooseCategory(state, action) {
			state.activeCategory = action.payload;
		},
		chooseSortBy(state, action) {
			state.sortBy = action.payload;
		},
		changeSearchValue(state, action) {
			state.searchValue = action.payload;
		}
	},

	extraReducers: {
		[fetchCategories.fulfilled]: (state, action) => {
			state.categories = action.payload;
		},
		[fetchCategories.rejected]: setError
	}
});

export const { chooseCategory, chooseSortBy, changeSearchValue } = filterSlice.actions;

export default filterSlice.reducer;
