import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../components/loginPage/auth/auth-reducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
