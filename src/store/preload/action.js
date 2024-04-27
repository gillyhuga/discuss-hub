import {hideLoading, showLoading} from 'react-redux-loading-bar';
import {usersApi} from '@/lib/api';
import {setAuthAction} from '@/store/auth/action';
import toast from 'react-hot-toast';

export const PRELOAD_ACTION_TYPE = {
  SET_PRELOAD: 'preload/set',
};

export function setPreloadAction(preload) {
  return {
    type: PRELOAD_ACTION_TYPE.SET_PRELOAD,
    payload: {
      preload,
    },
  };
}

export function asyncPreloadProcess() {
  return (dispatch) => {
    dispatch(showLoading());
    const isAuth = localStorage.getItem('accessToken');
    if (isAuth !== null && isAuth !== undefined) {
      usersApi.getProfile()
          .then((res) => {
            if (res.status === 'success') {
              dispatch(setAuthAction(res.data.user));
            } else {
              dispatch(setAuthAction(null));
            }
          })
          .catch((error) => {
            toast.error('Failed to fetch profile:', error);
            dispatch(setAuthAction(null));
          })
          .finally(() => {
            dispatch(hideLoading());
            dispatch(setPreloadAction(false));
          });
    } else {
      dispatch(hideLoading());
    }
  };
}
