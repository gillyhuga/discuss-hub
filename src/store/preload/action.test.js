/**
 * Scenario test for asyncPreloadProcess
 * * - asyncPreloadProcess function
 *   - should setAuthAction with user data on valid accessToken
 *   - should not attempt to fetch user profile if no accessToken
 *   - should handle API errors gracefully
 *   - should handle invalid user data from getProfile API
 *   - should handle invalid status from getProfile API
 *   - should handle API error without message from getProfile API
 *   - should handle API error with invalid message from getProfile API
 *   - should handle API error with valid message from getProfile API
 */

import {describe, it, expect, vi, beforeEach, afterEach} from 'vitest';
import {asyncPreloadProcess} from './action';
import {showLoading, hideLoading} from 'react-redux-loading-bar';
import {setAuthAction} from '@/store/auth/action';
import {usersApi} from '@/lib/api';

vi.mock('react-redux-loading-bar', () => ({
  showLoading: vi.fn(),
  hideLoading: vi.fn(),
}));

vi.mock('@/store/auth/action', () => ({
  setAuthAction: vi.fn(),
}));

vi.mock('@/lib/api', () => ({
  usersApi: {
    getProfile: vi.fn(),
  },
}));

describe('asyncPreloadProcess', () => {
  let dispatch;

  beforeEach(() => {
    dispatch = vi.fn();
    globalThis.localStorage = {
      getItem: vi.fn(),
    };
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should setAuthAction with user data on valid accessToken', async () => {
    const mockUser = {id: 1, name: 'John Doe'};
    localStorage.getItem.mockReturnValue('mock-access-token');
    usersApi.getProfile.mockResolvedValue({
      status: 'success',
      data: {user: mockUser},
    });

    asyncPreloadProcess()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setAuthAction(mockUser));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should not attempt to fetch user profile if no accessToken', async () => {
    localStorage.getItem.mockReturnValue(null);

    asyncPreloadProcess()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(dispatch).toHaveBeenCalledTimes(2);
  });

  it('should handle API errors gracefully', async () => {
    const error = new Error('Failed to fetch profile');
    localStorage.getItem.mockReturnValue('mock-access-token');
    usersApi.getProfile.mockRejectedValue(error);

    asyncPreloadProcess()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setAuthAction(null));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should handle invalid user data from getProfile API', async () => {
    const invalidUserData = {id: 1, name: 'John Doe', email: 'invalid-email'};
    localStorage.getItem.mockReturnValue('mock-access-token');
    usersApi.getProfile.mockResolvedValue({
      status: 'success',
      data: {user: invalidUserData},
    });

    await asyncPreloadProcess()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setAuthAction(null));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should handle invalid status from getProfile API', async () => {
    localStorage.getItem.mockReturnValue('mock-access-token');
    usersApi.getProfile.mockResolvedValue({
      status: 'error',
      data: {user: {id: 1, name: 'John Doe'}},
    });

    await asyncPreloadProcess()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setAuthAction(null));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should handle API error without message from getProfile API',
      async () => {
        localStorage.getItem.mockReturnValue('mock-access-token');
        usersApi.getProfile.mockRejectedValue(new Error());

        await asyncPreloadProcess()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(setAuthAction(null));
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
      });

  it('should handle API error with invalid message from getProfile API',
      async () => {
        localStorage.getItem.mockReturnValue('mock-access-token');
        usersApi.getProfile.mockRejectedValue(
            new Error('Invalid error message'),
        );

        await asyncPreloadProcess()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(setAuthAction(null));
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
      });
  it('should handle API error with valid message from getProfile API',
      async () => {
        const errorMessage = 'Failed to fetch profile';
        localStorage.getItem.mockReturnValue('mock-access-token');
        usersApi.getProfile.mockRejectedValue(new Error(errorMessage));

        await asyncPreloadProcess()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith(setAuthAction(null));
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
      });
});
