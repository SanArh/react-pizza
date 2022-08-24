import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getPizzas = createAsyncThunk('pizzas/fetchStatus', async (params) => {
  const { categoryId, sortValue, searchValue } = params;
  const response = await axios.get(
    `https://62e395043c89b95396cb6c94.mockapi.io/items?${
      categoryId > 0 ? `category=${categoryId}` : ''
    }&sortBy=${sortValue}&search=${searchValue}`,
  );
  return response.data;
});

const initialState = {
  items: [],
  loading: 'pending',
};
export const pizzaSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    addPizzas: (state, action) => {
      state.pizzas = action.payload;
    },
  },
  extraReducers: {
    [getPizzas.pending]: (state) => {
      state.loading = 'pending';
      state.items = [];
    },
    [getPizzas.fulfilled]: (state, action) => {
      state.loading = 'succeeded';
      state.items = action.payload;
    },
    [getPizzas.rejected]: (state) => {
      state.loading = 'error';
      state.items = [];
    },
  },
});

export const { addPizzas } = pizzaSlice.actions;

export default pizzaSlice.reducer;
