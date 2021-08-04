import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { resetLoading, setLoading } from './statusSlice';

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async (_, { rejectWithValue, dispatch }) => {
	try {
		dispatch(setLoading());
		const response = await axios('/api/orders');
		const data = response.data;
		return data;
	} catch (error) {
		return rejectWithValue(error.response.data.error);
	} finally {
		dispatch(resetLoading());
	}
});

export const fetchCountries = createAsyncThunk('orders/fetchCountries', async (_, { rejectWithValue, dispatch }) => {
	try {
		const response = await axios('/api/locations/countries');
		const data = response.data;
		const selectOptions = data.map((item) => ({
			value: item,
			label: item
		}));
		dispatch(addCountries(selectOptions));
		return selectOptions;
	} catch (error) {
		return rejectWithValue(error.response.data.error);
	}
});

const orderSlice = createSlice({
	name: 'orders',
	initialState: {
		orders: [],
		error: null,
		lastOrder: null,
		countries: [],
		activeCountry: null
	},
	reducers: {
		addProductToOrder(state, action) {
			let items;
			const newOrder = {
				...action.payload.product,
				quantity: action.payload.count
			};
			const orderExist = state.orders.find((order) => order.id === newOrder.id);
			if (orderExist) {
				const newOrdersList = state.orders.map((order) =>
					order.id === newOrder.id
						? {
								...orderExist,
								quantity: orderExist.quantity + newOrder.quantity
						  }
						: order
				);

				items = newOrdersList;
			} else {
				items = [...state.orders, newOrder];
			}
			state.orders = items;
		},
		removeProductFromOrder(state, action) {
			state.orders = state.orders.filter((order) => order.id !== action.payload.id);
		},
		increaseQuantity(state, action) {
			const newOrders = state.orders.map((order) => (order.id === action.payload.id ? { ...order, quantity: order.quantity + 1 } : order));
			state.orders = newOrders;
		},
		decreaseQuantity(state, action) {
			const newOrders = state.orders.map((order) => (order.id === action.payload.id ? { ...order, quantity: order.quantity !== 1 ? order.quantity - 1 : 1 } : order));
			state.orders = newOrders;
		},
		addNotification(state, action) {
			state.lastOrder = action.payload;
		},
		addCountries(state, action) {
			state.countries = action.payload;
		}
	},
	extraReducers: {
		[fetchOrders.fulfilled]: (state, { payload }) => {
			state.cart = payload;
		},
		[fetchOrders.rejected]: (state, action) => {
			state.error = action.payload;
		}
	}
});

export const { addProductToOrder, removeProductFromOrder, addNotification, increaseQuantity, decreaseQuantity, addCountries } = orderSlice.actions;

export default orderSlice.reducer;
