/**
 * Scenario test for leaderboardReducer
 * * - leaderboardReducer function
 *   - should handle LEADERBOARDS_ACTION_TYPE.GET_LEADERBOARDS
 */


import {describe, it, expect} from 'vitest';
import leaderboardReducer from './reducer';
import {LEADERBOARDS_ACTION_TYPE} from './action';

describe('leaderboardReducer', () => {
  it('should handle LEADERBOARDS_ACTION_TYPE.GET_LEADERBOARDS', () => {
    const action = {
      type: LEADERBOARDS_ACTION_TYPE.GET_LEADERBOARDS,
      payload: {
        leaderboards: [
          {
            user: {
              id: 'user-mQhLzINW_w5TxxYf',
              name: 'Admin',
              email: 'admin@dicoding.com',
              avatar: 'https://ui-avatars.com/api/?name=Admin&background=random',
            },
            score: 25,
          },
          {
            user: {
              id: 'user-83Wkop86jbYAdRR3',
              name: 'Gilly',
              email: 'hello@gillyhuga.com',
              avatar: 'https://ui-avatars.com/api/?name=Gilly&background=random',
            },
            score: 20,
          },
        ],
      },
    };
    const nextState = leaderboardReducer([], action);
    expect(nextState).toEqual(action.payload.leaderboards);
  });
});
