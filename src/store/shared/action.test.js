/**
 * Scenario test for sharedThunks
 * * - asyncUsersAndThreads function
 *   - should dispatch correct actions on success
 *   - should handle errors
 * * - asyncRegisterAndLogin function
 *   - should handle registration and login successfully
 *   - should handle errors in registration or login
 */

import {describe, it, expect, vi, beforeEach, afterEach} from 'vitest';
import {sharedThunks} from './action';
import {showLoading, hideLoading} from 'react-redux-loading-bar';
import toast from 'react-hot-toast';
import {getAllThreadAction} from '../threads/action';
import {getUsersAction} from '../users/action';
import {setAuthAction} from '../auth/action';
import {threadsApi, usersApi, authApi} from '@/lib/api';

vi.mock('react-redux-loading-bar', () => ({
  showLoading: vi.fn(),
  hideLoading: vi.fn(),
}));

vi.mock('react-hot-toast', () => {
  const originalModule = vi.importActual('react-hot-toast');
  return {
    __esModule: true,
    default: {
      ...originalModule.default,
      error: vi.fn(),
      success: vi.fn(),
    },
  };
});

vi.mock('@/lib/api', () => ({
  threadsApi: {
    getAllThreads: vi.fn(),
  },
  usersApi: {
    getUsers: vi.fn(),
    getProfile: vi.fn(),
  },
  authApi: {
    register: vi.fn(),
    login: vi.fn(),
  },
}));

describe('sharedThunks', () => {
  let dispatch;

  beforeEach(() => {
    dispatch = vi.fn();
    globalThis.localStorage = {
      setItem: vi.fn(),
    };
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('asyncUsersAndThreads', () => {
    it('should dispatch correct actions on success', async () => {
      const users = [{id: 1, name: 'John'}];
      const threads = [{id: 1, title: 'Thread 1'}];
      usersApi.getUsers.mockResolvedValue(users);
      threadsApi.getAllThreads.mockResolvedValue(threads);

      await sharedThunks.asyncUsersAndThreads()(dispatch);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(getUsersAction(users));
      expect(dispatch).toHaveBeenCalledWith(getAllThreadAction(threads));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it('should handle errors', async () => {
      const error = new Error('Failed to fetch');
      usersApi.getUsers.mockRejectedValue(error);

      await sharedThunks.asyncUsersAndThreads()(dispatch);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(toast.error).toHaveBeenCalledWith(error.message);
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  });

  describe('asyncRegisterAndLogin', () => {
    it('should handle registration and login successfully', async () => {
      const userData = {
        name: 'Jane',
        email: 'jane@example.com',
        password: '123456',
      };
      const accessToken = 'access-token';
      const userProfile = {data: {user: {id: 1, name: 'Jane'}}};

      authApi.register.mockResolvedValue();
      authApi.login.mockResolvedValue(accessToken);
      usersApi.getProfile.mockResolvedValue(userProfile);

      await sharedThunks.asyncRegisterAndLogin(userData)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(localStorage.setItem).toHaveBeenCalledWith(
          'accessToken',
          accessToken,
      );
      expect(dispatch).toHaveBeenCalledWith(
          setAuthAction(userProfile.data.user),
      );
      expect(toast.success).toHaveBeenCalledWith(
          'Successfully registered and logged in!',
      );
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it('should handle errors in registration or login', async () => {
      const userData = {
        name: 'Jane',
        email: 'jane@example.com',
        password: '123456',
      };
      const error = new Error('Registration failed');

      authApi.register.mockRejectedValue(error);

      await sharedThunks.asyncRegisterAndLogin(userData)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(toast.error).toHaveBeenCalledWith(error.message);
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  });
});
