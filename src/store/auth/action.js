import {hideLoading, showLoading} from 'react-redux-loading-bar';
import toast from 'react-hot-toast';
import {authApi, usersApi} from '@/lib/api';

export const AUTH_ACTION_TYPE = {
  SET_AUTH: 'SET_AUTH',
  UNSET_AUTH: 'UNSET_AUTH',
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
  asyncSetAuth(user, callback) {
    return (dispatch) => {
      dispatch(showLoading());
      authApi.login(user)
          .then((accessToken) => {
            localStorage.setItem('accessToken', accessToken);
            usersApi.getProfile().then((res) => {
              dispatch(setAuthAction(res.data.user));
              toast.success('Successfully login!');
              callback(res);
            });
          }).catch((error) => {
            toast.error(error.message);
          }).finally(() => {
            dispatch(hideLoading());
          });
    };
  },
};
