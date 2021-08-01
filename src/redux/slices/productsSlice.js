import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios("/api/products?offset=0&limit=12");
      const data = response.data;

      dispatch(setProducts(data));
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const fetchMoreProducts = createAsyncThunk(
  "products/fetchMoreProducts",
  async (itemsNumber, { rejectWithValue, getState }) => {
    try {
      const response = await axios(
        `/api/products?offset=${itemsNumber}&limit=12`
      );
      const data = response.data;
      const oldProductsList = getState().products.productsList;
      console.log(oldProductsList);
      const newProductsList = [...oldProductsList, ...data];
      // dispatch(loadMoreProducts(newProductsList));
      return newProductsList;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

const setLoading = (state) => {
  state.status = "loading";
  state.error = null;
};

const setError = (state, action) => {
  state.status = "rejected";
  state.error = action.payload;
};

const setResolved = (state, { payload }) => {
  state.productsList = payload;
  state.status = "resolved";
};

const productsSlice = createSlice({
  name: "products",
  initialState: {
    productsList: [],
    status: null,
    error: null,
  },
  reducers: {
    setProducts(state, action) {
      state.productsList = action.payload;
    },
    loadMoreProducts(state, action) {
      state.productsList = action.payload;
    },
  },
  extraReducers: {
    [fetchProducts.pending]: setLoading,
    [fetchProducts.fulfilled]: setResolved,
    [fetchProducts.rejected]: setError,
    [fetchMoreProducts.pending]: setLoading,
    [fetchMoreProducts.fulfilled]: setResolved,
    [fetchMoreProducts.rejected]: setError,
  },
});

export const { setProducts, loadMoreProducts } = productsSlice.actions;

export default productsSlice.reducer;
