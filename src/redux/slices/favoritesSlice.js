import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { setInitialProducts, setProducts } from "./productsSlice";
import { resetLoading, setLoading } from "./statusSlice";

export const addProductToFavorite = createAsyncThunk(
  "products/addProductToFavorite",
  async (id, { rejectWithValue, dispatch, getState }) => {
    try {
      dispatch(setLoading());
      const response = await axios.post(`/api/products/${id}/favorite`);
      const oldProductsList = getState().products.productsList;
      const toogleFavoriteProduct = oldProductsList.find(
        (favorite) => favorite.id === id
      );
      const newProducts = oldProductsList.map((product) =>
        product.id === toogleFavoriteProduct.id
          ? { ...product, favorite: true }
          : product
      );
      dispatch(setInitialProducts(newProducts));
      dispatch(setProducts(newProducts));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    } finally {
      dispatch(resetLoading());
    }
  }
);

export const removeProductFromFavorite = createAsyncThunk(
  "favorites/removeProductFromFavorite",
  async (id, { rejectWithValue, dispatch, getState }) => {
    try {
      dispatch(setLoading());
      const response = await axios.delete(`/api/products/${id}/favorite`);
      const oldProductsList = getState().products.productsList;
      const toogleFavoriteProduct = oldProductsList.find(
        (favorite) => favorite.id === id
      );
      const newProducts = oldProductsList.map((product) =>
        product.id === toogleFavoriteProduct.id
          ? { ...product, favorite: false }
          : product
      );
      dispatch(setProducts(newProducts));
      dispatch(setInitialProducts(newProducts));
      dispatch(removeFavoriteProduct({ id }));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    } finally {
      dispatch(resetLoading());
    }
  }
);

export const fetchFavoriteProducts = createAsyncThunk(
  "favorites/fetchFavoriteProducts",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading());
      const response = await axios(`/api/products/favorites`);

      dispatch(addFavoriteProduct(response.data));
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    } finally {
      dispatch(resetLoading());
    }
  }
);

const setError = (state, action) => {
  state.status = "rejected";
  state.error = action.payload;
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    favoriteList: [],
    status: null,
    error: null,
  },
  reducers: {
    addFavoriteProduct(state, action) {
      state.favoriteList = action.payload;
    },
    removeFavoriteProduct(state, action) {
      state.favoriteList = state.favoriteList.filter(
        (favoriteItem) => favoriteItem.id !== action.payload.id
      );
    },
  },
  extraReducers: {
    [addProductToFavorite.rejected]: setError,
  },
});

export const { addFavoriteProduct, removeFavoriteProduct } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;
