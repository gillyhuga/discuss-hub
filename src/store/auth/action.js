import {hideLoading, showLoading} from 'react-redux-loading-bar';
import toast from 'react-hot-toast';
import {authApi, usersApi} from '@/lib/api';

export const AUTH_ACTION_TYPE = {
  SET_AUTH: 'auth/set',
  UNSET_AUTH: 'auth/clear',
};

export function setAuthAction(auth) {
  return {
    type: AUTH_ACTION_TYPE.SET_AUTH,
    payload: {
      auth,
    },
  };
}

export function unsetAuthAction() {
  return {
    type: AUTH_ACTION_TYPE.UNSET_AUTH,
  };
}

export const authThunks = {
  asyncSetAuth(user) {
    return async (dispatch) => {
      dispatch(showLoading());
      await authApi.login(user)
          .then(async (accessToken) => {
            localStorage.setItem('accessToken', accessToken);
            await usersApi.getProfile().then((res) => {
              dispatch(setAuthAction(res.data.user));
              toast.success('Successfully login!');
            });
          }).catch((error) => {
            toast.error(error.message);
          }).finally(() => {
            dispatch(hideLoading());
          });
    };
  },
};
