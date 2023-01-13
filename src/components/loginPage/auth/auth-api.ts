import Axios from 'axios';
import routes from '../../../constants/routes';
import { Credentials, LoginType } from './types';

const backendUrl = 'http://127.0.0.1:5000/';

export const loginUser = async (
  credentials: Credentials,
): Promise<LoginType> => {
  try {
    const url = `${backendUrl}${routes.API.BASE}${routes.API.LOGGED_IN}`;

    const response = await Axios({
      method: 'POST',
      url,
      data: credentials,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
