import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api";

const initialState = {
  value: [],
  status: "empty",
};

export const reviewsAsync = createAsyncThunk(
  "reviews/fetchReview",
  async (bookId) => {
    return await api.fetchReviews(bookId);
  }
);

export const addReviewsAsync = createAsyncThunk(
  "reviews/addReview",
  async (review) => {
    return await api.addReview(review);
  }
);

export const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(reviewsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.value = action.payload;
      })
      .addCase(addReviewsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.value = [action.payload, ...state.value];
      });
  },
});

export const selectReviewById = (state, id) => {
  return state.reviews.value.find((item) => item.bookId === id);
};

export default reviewSlice.reducer;
