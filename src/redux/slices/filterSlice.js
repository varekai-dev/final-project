import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCategories = createAsyncThunk(
  "filter/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios(`/api/categories`);
      return response.data;
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

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    sortBy: "",
    activeCategory: "",
    categories: [],
    status: null,
    error: null,
  },

  extraReducers: {
    [fetchCategories.fulfilled]: (state, action) => {
      state.categories = action.payload;
    },
    [fetchCategories.pending]: setLoading,
    [fetchCategories.rejected]: setError,
  },
});

export default filterSlice.reducer;
