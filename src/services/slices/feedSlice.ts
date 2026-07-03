// src/services/slices/feedSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  getFeedsApi,
  getOrdersApi,
  getOrderByNumberApi
} from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

interface FeedState {
  publicOrders: TOrder[];
  userOrders: TOrder[];
  total: number;
  totalToday: number;
  loading: boolean;
  userOrdersLoading: boolean;
  currentOrder: TOrder | null; // Поле для текущего заказа
  currentOrderLoading: boolean; // Поле для статуса загрузки
  error: string | null;
}

const initialState: FeedState = {
  publicOrders: [],
  userOrders: [],
  total: 0,
  totalToday: 0,
  loading: false,
  userOrdersLoading: false,
  currentOrder: null,
  currentOrderLoading: false,
  error: null
};

// Существующие thunk-и
export const fetchFeeds = createAsyncThunk('feed/fetchFeeds', async () => {
  const response = await getFeedsApi();
  return response;
});

export const fetchUserOrders = createAsyncThunk(
  'feed/fetchUserOrders',
  async () => {
    const orders = await getOrdersApi();
    return orders;
  }
);

// НОВЫЙ THUNK для получения заказа по номеру
export const fetchOrderByNumber = createAsyncThunk(
  'feed/fetchOrderByNumber',
  async (number: number) => {
    const response = await getOrderByNumberApi(number);
    if (response.success && response.orders.length) {
      return response.orders[0];
    }
    throw new Error('Заказ не найден');
  }
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
      state.currentOrderLoading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Существующие редьюсеры
      .addCase(fetchFeeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.loading = false;
        state.publicOrders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки ленты заказов';
      })
      .addCase(fetchUserOrders.pending, (state) => {
        state.userOrdersLoading = true;
        state.error = null;
      })
      .addCase(
        fetchUserOrders.fulfilled,
        (state, action: PayloadAction<TOrder[]>) => {
          state.userOrdersLoading = false;
          state.userOrders = action.payload;
        }
      )
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.userOrdersLoading = false;
        state.error = action.error.message || 'Ошибка загрузки заказов';
      })
      // НОВЫЕ РЕДЬЮСЕРЫ для fetchOrderByNumber
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.currentOrderLoading = true;
        state.currentOrder = null;
        state.error = null;
      })
      .addCase(
        fetchOrderByNumber.fulfilled,
        (state, action: PayloadAction<TOrder>) => {
          state.currentOrderLoading = false;
          state.currentOrder = action.payload;
        }
      )
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.currentOrderLoading = false;
        state.currentOrder = null;
        state.error = action.error.message || 'Ошибка загрузки заказа';
      });
  }
});

export const { clearCurrentOrder } = feedSlice.actions;
export default feedSlice.reducer;