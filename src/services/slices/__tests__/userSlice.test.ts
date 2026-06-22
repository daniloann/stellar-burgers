import userReducer, {
  loginUser,
  registerUser,
  getUser,
  updateUser,
  logout,
  setAuthChecked
} from '../userSlice';
import { TUser } from '../../../utils/types';

const mockUser: TUser = {
  email: 'test@test.com',
  name: 'Test User'
};

describe('userSlice', () => {
  const initialState = {
    user: null,
    isAuthChecked: false,
    loginUserRequest: false,
    registerUserRequest: false,
    updateUserRequest: false,
    error: null
  };

  test('should return initial state', () => {
    expect(userReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('should handle setAuthChecked', () => {
    const state = userReducer(initialState, setAuthChecked(true));
    expect(state.isAuthChecked).toBe(true);
  });

  test('should handle loginUser.pending', () => {
    const action = { type: loginUser.pending.type };
    const state = userReducer(initialState, action);
    expect(state.loginUserRequest).toBe(true);
    expect(state.error).toBeNull();
  });

  test('should handle loginUser.fulfilled', () => {
    const action = { type: loginUser.fulfilled.type, payload: mockUser };
    const state = userReducer(initialState, action);
    expect(state.loginUserRequest).toBe(false);
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthChecked).toBe(true);
  });

  test('should handle loginUser.rejected', () => {
    const action = {
      type: loginUser.rejected.type,
      error: { message: 'Login failed' }
    };
    const state = userReducer(initialState, action);
    expect(state.loginUserRequest).toBe(false);
    expect(state.error).toBe('Login failed');
  });

  test('should handle registerUser.fulfilled', () => {
    const action = { type: registerUser.fulfilled.type, payload: mockUser };
    const state = userReducer(initialState, action);
    expect(state.registerUserRequest).toBe(false);
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthChecked).toBe(true);
  });

  test('should handle getUser.fulfilled', () => {
    const action = { type: getUser.fulfilled.type, payload: mockUser };
    const state = userReducer(initialState, action);
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthChecked).toBe(true);
  });

  test('should handle getUser.rejected', () => {
    const action = { type: getUser.rejected.type };
    const state = userReducer(initialState, action);
    expect(state.user).toBeNull();
    expect(state.isAuthChecked).toBe(true);
  });

  test('should handle updateUser.fulfilled', () => {
    const updatedUser = { ...mockUser, name: 'Updated Name' };
    const action = { type: updateUser.fulfilled.type, payload: updatedUser };
    const state = userReducer(initialState, action);
    expect(state.updateUserRequest).toBe(false);
    expect(state.user).toEqual(updatedUser);
  });

  test('should handle logout.fulfilled', () => {
    const stateWithUser = { ...initialState, user: mockUser };
    const action = { type: logout.fulfilled.type };
    const state = userReducer(stateWithUser, action);
    expect(state.user).toBeNull();
    expect(state.isAuthChecked).toBe(true);
  });
});
