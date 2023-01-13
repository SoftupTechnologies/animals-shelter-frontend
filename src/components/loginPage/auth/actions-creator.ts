import { AppDispatch } from '../../../app/store';
import { loginUser } from './auth-api';
import { hasError, isLoading, addUser } from './auth-reducer';
import { Credentials } from './types';

export const login = (credentials: Credentials) => {
  return async (dispatch: AppDispatch) => {
    dispatch(isLoading(true));
    try {
      const currentUser = await loginUser(credentials);
      const { token } = currentUser;
      localStorage.setItem('token', token);
      dispatch(addUser(currentUser));
    } catch (error: any) {
      dispatch(hasError(error.message));
    } finally {
      dispatch(isLoading(false));
    }
  };
};
