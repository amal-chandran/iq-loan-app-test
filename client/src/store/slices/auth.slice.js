import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { requestJsonAPI } from '../../helpers/api.helper';

export const login = createAsyncThunk('auth/login', async (data, thunk) => {
  return await requestJsonAPI(thunk, 'POST', 'auth/login', data);
});

export const register = createAsyncThunk(
  'auth/register',
  async (data, thunk) => {
    return await requestJsonAPI(thunk, 'POST', 'auth/register', data);
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  return true;
});

const auth = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: {},
    loading: false,
    error: null,
  },
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: {
    // Login
    [login.pending]: (state, action) => ({
      ...state,
      loading: true,
    }),
    [login.rejected]: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
    [login.fulfilled]: (state, action) => ({
      ...state,
      isAuthenticated: true,
      loading: false,

      ...action.payload,
    }),
    // Register
    [register.pending]: (state, action) => ({
      ...state,
      loading: true,
    }),
    [register.rejected]: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
    [register.fulfilled]: (state, action) => ({
      ...state,
      loading: false,
    }),
    // Logout
    [logout.fulfilled]: (state, action) => ({
      ...state,
      loading: false,
      isAuthenticated: false,
      user: {},
      error: null,
    }),
  },
});

export const { clearErrors } = auth.actions;
export default auth.reducer;
