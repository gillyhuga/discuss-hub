import {hideLoading, showLoading} from 'react-redux-loading-bar';
import {usersApi} from '@/lib/api';
import {setAuthAction} from '@/store/auth/action';

export const PRELEOAD_ACTION_TYPE = {
  SET_PRELOAD: 'SET_PRELOAD',
};

export function setPreloadAction(preload) {
  return {
    type: PRELEOAD_ACTION_TYPE.SET_PRELOAD,
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
              dispatch(hideLoading());
            } else {
              dispatch(setAuthAction(null));
              dispatch(hideLoading());
            }
          })
          .finally(() => {
            dispatch(setPreloadAction(false));
          });
    }
    dispatch(hideLoading());
  };
}
