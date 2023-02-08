import { NavigateFunction } from 'react-router-dom';
import { AppDispatch } from '../../../app/store';
import { routes } from '../../../constants/routes';
import { loginUser } from './auth-api';
import { hasError, isLoading, addUser } from './auth-reducer';
import { Credentials } from './types';

export const login = (credentials: Credentials, navigate: NavigateFunction) => {
  return async (dispatch: AppDispatch) => {
    dispatch(isLoading(true));
    try {
      const currentUser = await loginUser(credentials);
      const { token } = currentUser;
      localStorage.setItem('token', token);
      dispatch(addUser(currentUser));
      navigate(routes.APP_DASHBOARD);
    } catch (error: any) {
      dispatch(hasError(error.message));
    } finally {
      dispatch(isLoading(false));
    }
  };
};
