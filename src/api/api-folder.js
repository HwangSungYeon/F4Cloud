import api from './api-base';
import { useAuth } from '../context/auth';

const { authTokens, setAuthTokens } = useAuth();

const headers = {
  Authorization: authTokens.AccessToken,
  'Access-Key-Id': authTokens.AccessKey,
};

export const folderApi = {
  signUp: ({ user_id, user_password, confirm_user_password, user_email }) =>
    api.post('/users/sign_up/', {
      user_id,
      user_password,
      confirm_user_password,
      user_email,
    }),
  signIn: ({ user_id, user_password }) =>
    api.post('/users/sign_in/', {
      user_id,
      user_password,
    }),
  verification: ({ user_id, code }) =>
    api.post('/users/confirm_sign_up/', {
      user_id,
      code,
    }),
};
