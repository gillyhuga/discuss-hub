/**
 * Scenario test for authReducer
 * * - authReducer function
 *   - should set auth state when action type is SET_AUTH
 *   - should unset auth state when action type is UNSET_AUTH
 *   - should return current state for unknown action type
 */

import {describe, it, expect} from 'vitest';
import {authReducer} from './reducer';
import {AUTH_ACTION_TYPE} from './action';

describe('authReducer', () => {
  it('should set auth state when action type is SET_AUTH', () => {
    const auth = {
      id: 'user-CxKB8668YtusCQW5',
      name: 'Gilly',
      email: 'hello@gillyhuga.com',
      avatar: 'https://ui-avatars.com/api/?name=Gilly&background=random',
    };
    const action = {type: AUTH_ACTION_TYPE.SET_AUTH, payload: {auth}};
    const nextState = authReducer(null, action);
    expect(nextState).toEqual(auth);
  });

  it('should unset auth state when action type is UNSET_AUTH', () => {
    const action = {type: AUTH_ACTION_TYPE.UNSET_AUTH};
    const nextState = authReducer({id: 'user123', name: 'Alice'}, action);
    expect(nextState).toBeNull();
  });

  it('should return current state for unknown action type', () => {
    const currentState = {
      id: 'user-CxKB8668YtusCQW5',
      name: 'Gilly',
      email: 'hello@gillyhuga.com',
      avatar: 'https://ui-avatars.com/api/?name=Gilly&background=random',
    };
    const action = {type: 'UNKNOWN_ACTION'};
    const nextState = authReducer(currentState, action);
    expect(nextState).toEqual(currentState);
  });
});
