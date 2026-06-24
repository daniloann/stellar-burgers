import feedReducer, {
  fetchFeeds,
  fetchUserOrders,
  fetchOrderByNumber,
  clearCurrentOrder
} from '../feedSlice';
import { TOrder } from '../../../utils/types';

const mockOrder: TOrder = {
  _id: '1',
  status: 'done',
  name: 'Test Order',
  createdAt: '2024-01-01',
  updatedAt: '2024-01-01',
  number: 123,
  ingredients: ['1', '2']
};

describe('feedSlice', () => {
  const initialState = {
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

  test('should return initial state', () => {
    expect(feedReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('should handle fetchFeeds.pending', () => {
    const action = { type: fetchFeeds.pending.type };
    const state = feedReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('should handle fetchFeeds.fulfilled', () => {
    const action = {
      type: fetchFeeds.fulfilled.type,
      payload: { orders: [mockOrder], total: 10, totalToday: 2 }
    };
    const state = feedReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.publicOrders).toEqual([mockOrder]);
    expect(state.total).toBe(10);
    expect(state.totalToday).toBe(2);
  });

  test('should handle fetchUserOrders.fulfilled', () => {
    const action = {
      type: fetchUserOrders.fulfilled.type,
      payload: [mockOrder]
    };
    const state = feedReducer(initialState, action);
    expect(state.userOrdersLoading).toBe(false);
    expect(state.userOrders).toEqual([mockOrder]);
  });

  test('should handle fetchOrderByNumber.pending', () => {
    const action = { type: fetchOrderByNumber.pending.type };
    const state = feedReducer(initialState, action);
    expect(state.currentOrderLoading).toBe(true);
    expect(state.currentOrder).toBeNull();
  });

  test('should handle fetchOrderByNumber.fulfilled', () => {
    const action = {
      type: fetchOrderByNumber.fulfilled.type,
      payload: mockOrder
    };
    const state = feedReducer(initialState, action);
    expect(state.currentOrderLoading).toBe(false);
    expect(state.currentOrder).toEqual(mockOrder);
  });

  test('should handle clearCurrentOrder', () => {
    const stateWithOrder = {
      ...initialState,
      currentOrder: mockOrder,
      currentOrderLoading: true
    };
    const state = feedReducer(stateWithOrder, clearCurrentOrder());
    expect(state.currentOrder).toBeNull();
    expect(state.currentOrderLoading).toBe(false);
  });
});
