import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setProducts } from "./productsSlice";
import { resetLoading, setLoading } from "./statusSlice";

export const fetchCategories = createAsyncThunk(
  "filter/fetchCategories",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      dispatch(setLoading());
      const response = await axios(`/api/categories`);
      const filters = response.data.map((filter) => ({
        value: filter.name,
        label: filter.name,
        id: filter.id,
      }));
      return filters;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    } finally {
      dispatch(resetLoading());
    }
  }
);

export const fetchProductsBySearch = createAsyncThunk(
  "filter/fetchProductsBySearch",
  async (_, { rejectWithValue, dispatch, getState }) => {
    const searchValue = getState().filter.searchValue;
    try {
      dispatch(setLoading());
      const response = await axios(
        `/api/products/search?keywords=${searchValue}&offset=0&limit=16`
      );
      dispatch(setProducts(response.data));
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    } finally {
      dispatch(resetLoading());
    }
  }
);

export const fetchProductsBySort = createAsyncThunk(
  "products/fetchProductsBySort",
  async (_, { rejectWithValue, dispatch, getState }) => {
    const sortBy = getState().filter.activeSortBy;
    const limit = getState().products.limit;
    try {
      dispatch(setLoading());
      const response = await axios(
        `/api/products?offset=0&limit=${limit}&sortBy=${sortBy.value}`
      );
      const data = response.data;
      dispatch(setProducts(data));
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    } finally {
      dispatch(resetLoading());
    }
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  "filter/fetchProductsByCategory",
  async (_, { rejectWithValue, dispatch, getState }) => {
    const limit = getState().products.limit;
    const activeCategory = getState().filter.activeCategory.id;
    try {
      dispatch(setLoading());
      const response = await axios(
        `/api/categories${
          activeCategory ? `/${activeCategory}/products?limit=${limit}` : ""
        }`
      );
      dispatch(setProducts(response.data));
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    } finally {
      dispatch(resetLoading());
    }
  }
);

export const fetchMoreProductsByCategory = createAsyncThunk(
  "products/fetchMoreProductsByCategory",
  async (itemsNumber, { rejectWithValue, getState, dispatch }) => {
    const activeCategory = getState().filter.activeCategory.id;
    const limit = getState().products.limit;
    try {
      dispatch(setLoading());
      const response = await axios(
        `/api/categories/${activeCategory}/products?offset=${itemsNumber}&limit=${limit}`
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

export const fetchMoreProductsBySort = createAsyncThunk(
  "products/fetchMoreProductsBySort",
  async (itemsNumber, { rejectWithValue, getState, dispatch }) => {
    const sortBy = getState().filter.activeSortBy;
    const limit = getState().products.limit;
    try {
      dispatch(setLoading());
      const response = await axios(
        `/api/products?offset=${itemsNumber}&limit=${limit}&sortBy=${sortBy.value}`
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
  state.status = "rejected";
  state.error = action.payload;
};

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    activeSortBy: null,
    activeCategory: null,
    categories: [],
    status: null,
    error: null,
    searchValue: "",
  },
  reducers: {
    chooseCategory(state, action) {
      state.activeCategory = action.payload;
    },
    chooseSortBy(state, action) {
      state.activeSortBy = action.payload;
    },
    changeSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    resetCategories(state) {
      state.activeCategory = null;
    },
    resetSortBy(state) {
      state.activeSortBy = null;
    },
  },

  extraReducers: {
    [fetchCategories.fulfilled]: (state, action) => {
      state.categories = action.payload;
    },
    [fetchCategories.rejected]: setError,
  },
});

export const {
  chooseCategory,
  chooseSortBy,
  changeSearchValue,
  resetSortBy,
  resetCategories,
} = filterSlice.actions;

export default filterSlice.reducer;
