import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, LoginType } from './types';

const initialState: AuthState = {
  user: undefined,
  isLoading: false,
  error: undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    isLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    hasError: (state, action: PayloadAction<any>) => {
      state.error = action.payload;
    },
    addUser: (state, action: PayloadAction<LoginType | undefined>) => {
      state.user = action.payload;
    },
  },
});

export const { isLoading, hasError, addUser } = authSlice.actions;

export default authSlice.reducer;
