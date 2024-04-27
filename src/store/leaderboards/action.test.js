/**
 * Scenario test for asyncGetLeaderboards
 * * - asyncGetLeaderboards function
 *   - should dispatch correct actions on success
 *   - should handle error
 */

import {describe, it, expect, vi, beforeEach, afterEach} from 'vitest';
import {leaderboardThunks, getLeaderboardAction} from './action';
import {showLoading, hideLoading} from 'react-redux-loading-bar';
import toast from 'react-hot-toast';
import {leaderboardsApi} from '@/lib/api';

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
  leaderboardsApi: {
    getLeaderboards: vi.fn(),
  },
}));

describe('leaderboardThunks', () => {
  let dispatch;

  beforeEach(() => {
    dispatch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('asyncGetLeaderboards', () => {
    it('should dispatch correct actions on success', async () => {
      const leaderboards = [
        {
          'user': {
            'id': 'user-mQhLzINW_w5TxxYf',
            'name': 'Dimas Saputra',
            'email': 'dimas@dicoding.com',
            'avatar': 'https://ui-avatars.com/api/?name=Dimas Saputra&background=random',
          },
          'score': 25,
        },
        {
          'user': {
            'id': 'user-zab8mAZJnfYBL0q1',
            'name': 'anjaymabar',
            'email': 'anjaymabar@gmail.com',
            'avatar': 'https://ui-avatars.com/api/?name=anjaymabar&background=random',
          },
          'score': 25,
        },
      ];
      leaderboardsApi.getLeaderboards.mockResolvedValue(leaderboards);

      await leaderboardThunks.asyncGetLeaderboards()(dispatch);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(getLeaderboardAction(leaderboards));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it('should handle errors', async () => {
      const error = new Error('Failed to fetch leaderboards');
      leaderboardsApi.getLeaderboards.mockRejectedValue(error);

      await leaderboardThunks.asyncGetLeaderboards()(dispatch);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(toast.error).toHaveBeenCalledWith(error.message);
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  });
});
