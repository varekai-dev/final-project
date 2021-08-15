import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { resetLoading, setLoading } from "./statusSlice";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue, dispatch, getState }) => {
    const limit = getState().products.limit;
    try {
      dispatch(setLoading());
      const response = await axios(`/api/products?offset=0&limit=${limit}`);
      const data = response.data;
      dispatch(setProducts(data));
      dispatch(setInitialProducts(data));

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    } finally {
      dispatch(resetLoading());
    }
  }
);

export const fetchMoreProducts = createAsyncThunk(
  "products/fetchMoreProducts",
  async (itemsNumber, { rejectWithValue, getState, dispatch }) => {
    const limit = getState().products.limit;
    try {
      dispatch(setLoading());
      const response = await axios(
        `/api/products?offset=${itemsNumber}&limit=${limit}`
      );
      const data = response.data;
      const oldProductsList = getState().products.productsList;

      const newProductsList = [...oldProductsList, ...data];
      dispatch(setProducts(newProductsList));
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    } finally {
      dispatch(resetLoading());
    }
  }
);

const setError = (state, action) => {
  state.error = action.payload;
};

const setResolved = (state, { payload }) => {
  state.productsList = payload;
  state.initialProductsFetch = payload;
};

const productsSlice = createSlice({
  name: "products",
  initialState: {
    productsList: [],
    initialProductsFetch: [],
    status: null,
    error: null,
    limit: 12,
  },
  reducers: {
    setProducts(state, action) {
      state.productsList = action.payload;
    },
    loadMoreProducts(state, action) {
      state.productsList = action.payload;
    },
    setInitialProducts(state, action) {
      state.initialProductsFetch = action.payload;
    },
    resetToInitialProducts(state) {
      state.productsList = state.initialProductsFetch;
    },
  },
  extraReducers: {
    [fetchProducts.fulfilled]: setResolved,
    [fetchProducts.rejected]: setError,
  },
});

export const {
  setProducts,
  loadMoreProducts,
  setInitialProducts,
  resetToInitialProducts,
} = productsSlice.actions;

export default productsSlice.reducer;
