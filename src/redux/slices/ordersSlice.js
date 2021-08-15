import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { setActivePopup } from "./popupSlice";
import { resetLoading, setLoading } from "./statusSlice";

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading());
      const response = await axios("/api/orders");
      const data = response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    } finally {
      dispatch(resetLoading());
    }
  }
);

export const fetchCountries = createAsyncThunk(
  "orders/fetchCountries",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios("/api/locations/countries");
      const data = response.data;
      const selectOptions = data.map((item) => ({
        value: item,
        label: item,
      }));
      dispatch(addCountries(selectOptions));
      return selectOptions;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const fetchOrdersFromServer = createAsyncThunk(
  "orders/fetchOrdersFromServer",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios("/api/orders");
      const data = response.data;
      dispatch(addOrdersFromServer(data));
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const makeOrder = createAsyncThunk(
  "orders/makeOrder",
  async (shipment, { rejectWithValue, dispatch, getState }) => {
    const orders = getState().orders.orders;
    const items = orders.map((order) => ({
      productId: order.id,
      quantity: order.quantity,
    }));
    const order = {
      items,
      shipment,
    };

    try {
      const response = await axios.post("/api/orders", order);
      const data = response.data;
      dispatch(setActivePopup("purchasePopup"));
      dispatch(clearOrders());
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: sessionStorage.getItem("orders")
      ? JSON.parse(sessionStorage.getItem("orders"))
      : [],
    error: null,
    countries: [],
    activeCountry: null,
    ordersFromServer: [],
    singleOrderItem: null,
  },
  reducers: {
    addProductToOrder(state, action) {
      let items;
      const newOrder = {
        ...action.payload.product,
        quantity: action.payload.count,
      };
      const orderExist = state.orders.find((order) => order.id === newOrder.id);
      if (orderExist) {
        const newOrdersList = state.orders.map((order) =>
          order.id === newOrder.id
            ? {
                ...orderExist,
                quantity: orderExist.quantity + newOrder.quantity,
              }
            : order
        );

        items = newOrdersList;
      } else {
        items = [...state.orders, newOrder];
      }
      sessionStorage.setItem("orders", JSON.stringify(items));

      state.orders = items;
    },
    removeProductFromOrder(state, action) {
      state.orders = state.orders.filter(
        (order) => order.id !== action.payload.id
      );
    },
    increaseQuantity(state, action) {
      const newOrders = state.orders.map((order) =>
        order.id === action.payload.id
          ? { ...order, quantity: order.quantity + 1 }
          : order
      );
      state.orders = newOrders;
    },
    decreaseQuantity(state, action) {
      const newOrders = state.orders.map((order) =>
        order.id === action.payload.id
          ? {
              ...order,
              quantity: order.quantity !== 1 ? order.quantity - 1 : 1,
            }
          : order
      );
      state.orders = newOrders;
    },

    addCountries(state, action) {
      state.countries = action.payload;
    },
    clearOrders(state) {
      state.orders = [];
    },
    addOrdersFromServer(state, action) {
      state.ordersFromServer = action.payload;
    },
    addSingleOrderItem(state, action) {
      state.singleOrderItem = action.payload;
    },
  },
  extraReducers: {
    [fetchOrders.fulfilled]: (state, { payload }) => {
      state.cart = payload;
    },
    [fetchOrders.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  addSingleOrderItem,
  addOrdersFromServer,
  clearOrders,
  addProductToOrder,
  removeProductFromOrder,
  increaseQuantity,
  decreaseQuantity,
  addCountries,
} = orderSlice.actions;

export default orderSlice.reducer;
