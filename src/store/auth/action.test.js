/**
 * Scenario test for authThunks
 * * - asyncSetAuth function
 *   - should dispatch correct actions on success
 *   - should handle errors
 */

import {describe, it, expect, vi, beforeEach, afterEach} from 'vitest';
import {authThunks} from './action';
import {showLoading, hideLoading} from 'react-redux-loading-bar';
import {setAuthAction} from './action';
import {authApi, usersApi} from '@/lib/api';
import toast from 'react-hot-toast';

vi.mock('react-redux-loading-bar', () => ({
  showLoading: vi.fn(),
  hideLoading: vi.fn(),
}));

vi.mock('@/lib/api', () => ({
  authApi: {
    login: vi.fn(),
  },
  usersApi: {
    getProfile: vi.fn(),
  },
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

describe('authThunks', () => {
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
  describe('asyncSetAuth', () => {
    it('should dispatch correct actions on success', async () => {
      const user = {email: 'test@example.com', password: 'password'};
      const accessToken = 'access-token';
      const userProfile = {data: {user: {id: 1, name: 'Test User'}}};

      authApi.login.mockResolvedValue(accessToken);
      usersApi.getProfile.mockResolvedValue(userProfile);

      await authThunks.asyncSetAuth(user)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(localStorage.setItem).toHaveBeenCalledWith(
          'accessToken', accessToken,
      );
      expect(dispatch).toHaveBeenCalledWith(setAuthAction(
          userProfile.data.user,
      ));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it('should handle errors', async () => {
      const user = {email: 'test@example.com', password: 'password'};
      const error = new Error('Login failed');

      authApi.login.mockRejectedValue(error);

      await authThunks.asyncSetAuth(user)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(toast.error).toHaveBeenCalledWith(error.message);
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  });
});
