/**
 * Scenario test for usersReducer
 * * - usersReducer function
 *   - should return the initial state
 *   - should handle USERS_ACTION_TYPE.GET_USERS
 */

import {describe, it, expect} from 'vitest';
import usersReducer from './reducer';
import {USERS_ACTION_TYPE} from './action';

describe('usersReducer', () => {
  it('should return the initial state', () => {
    const initialState = [];
    const action = {type: 'UNKNOWN_ACTION'};
    const nextState = usersReducer(initialState, action);
    expect(nextState).toEqual(initialState);
  });

  it('should handle USERS_ACTION_TYPE.GET_USERS', () => {
    const initialState = [];
    const users = [{
      'id': 'user-aROWej8yYA1sOfHN',
      'name': 'Gilly',
      'email': 'hello@gillyhuga.com',
      'avatar': 'https://ui-avatars.com/api/?name=Gilly&background=random',
    }];
    const action = {
      type: USERS_ACTION_TYPE.GET_USERS,
      payload: {users},
    };
    const nextState = usersReducer(initialState, action);
    expect(nextState).toEqual(users);
  });
});
