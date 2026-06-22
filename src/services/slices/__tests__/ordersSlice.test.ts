import ordersReducer, { createOrder, closeOrderModal } from '../ordersSlice';
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

describe('ordersSlice', () => {
  const initialState = {
    orderRequest: false,
    orderModalData: null,
    error: null
  };

  test('should return initial state', () => {
    expect(ordersReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('should handle createOrder.pending', () => {
    const action = { type: createOrder.pending.type };
    const state = ordersReducer(initialState, action);
    expect(state.orderRequest).toBe(true);
    expect(state.error).toBeNull();
  });

  test('should handle createOrder.fulfilled', () => {
    const action = { type: createOrder.fulfilled.type, payload: mockOrder };
    const state = ordersReducer(initialState, action);
    expect(state.orderRequest).toBe(false);
    expect(state.orderModalData).toEqual(mockOrder);
  });

  test('should handle createOrder.rejected', () => {
    const action = {
      type: createOrder.rejected.type,
      error: { message: 'Failed to create order' }
    };
    const state = ordersReducer(initialState, action);
    expect(state.orderRequest).toBe(false);
    expect(state.error).toBe('Failed to create order');
  });

  test('should handle closeOrderModal', () => {
    const stateWithOrder = { ...initialState, orderModalData: mockOrder };
    const state = ordersReducer(stateWithOrder, closeOrderModal());
    expect(state.orderModalData).toBeNull();
  });
});
