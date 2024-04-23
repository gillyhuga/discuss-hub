import {hideLoading, showLoading} from 'react-redux-loading-bar';
import toast from 'react-hot-toast';
import {getAllThreadAction} from '../threads/action';
import {getUsersAction} from '../users/action';
import {setAuthAction} from '../auth/action';

import {threadsApi, usersApi, authApi} from '@/lib/api';

export const sharedThunks = {
  asyncUsersAndThreads() {
    return async (dispatch) => {
      try {
        dispatch(showLoading());
        const [users, threads] = await Promise.all([
          usersApi.getUsers(),
          threadsApi.getAllThreads(),
        ]);
        dispatch(getUsersAction(users));
        dispatch(getAllThreadAction(threads));
      } catch (error) {
        toast.error(error.message);
      } finally {
        dispatch(hideLoading());
      }
    };
  },
  asyncRegisterAndLogin({name, email, password}) {
    return async (dispatch) => {
      dispatch(showLoading());

      try {
        await authApi.register({name, email, password});
        await authApi
            .login({email, password})
            .then((accessToken) => {
              localStorage.setItem('accessToken', accessToken);
              return usersApi.getProfile();
            })
            .then((res) => {
              dispatch(setAuthAction(res.data.user));
              toast.success('Successfully registered and logged in!');
            });
      } catch (error) {
        toast.error(error.message);
      }

      dispatch(hideLoading());
    };
  },
};
