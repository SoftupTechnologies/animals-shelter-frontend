import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import authReducer from '../pages/LoginPage/auth/auth-reducer';
import animalReducer from '../pages/MainPage/core/animal-reducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    animals: animalReducer,
  },
  // middleware: getDefaultMiddleware({
  //   serializableCheck: false,
  // }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
