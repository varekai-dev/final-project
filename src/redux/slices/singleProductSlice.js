import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { resetLoading, setLoading } from "./statusSlice";

export const fetchSingleProduct = createAsyncThunk(
  "products/fetchSingleProduct",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading());
      const response = await axios(`/api/products/${id}`);
      dispatch(setProduct(response.data));
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    } finally {
      dispatch(resetLoading());
    }
  }
);

const singleProductSlice = createSlice({
  name: "singleProduct",
  initialState: {
    product: null,
  },
  reducers: {
    setProduct(state, action) {
      state.product = action.payload;
    },
    toggleFavorite(state) {
      state.product.favorite = !state.product.favorite;
    },
  },
});

export default singleProductSlice.reducer;

export const { setProduct, toggleFavorite } = singleProductSlice.actions;
