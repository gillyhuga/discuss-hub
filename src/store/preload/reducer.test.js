/**
 * Scenario test for preloadReducer
 * * - preloadReducer function
 *   - should set preload state to true
 *   - should set preload state to false
 *   - should return current state for unknown action type
 */

import {describe, it, expect} from 'vitest';
import {preloadReducer} from './reducer';
import {PRELOAD_ACTION_TYPE} from './action';

describe('preloadReducer', () => {
  it('should set preload state to true', () => {
    const action = {
      type: PRELOAD_ACTION_TYPE.SET_PRELOAD,
      payload: {
        preload: true,
      },
    };
    const nextState = preloadReducer(false, action);
    expect(nextState).toEqual(true);
  });

  it('should set preload state to false', () => {
    const action = {
      type: PRELOAD_ACTION_TYPE.SET_PRELOAD,
      payload: {
        preload: false,
      },
    };
    const nextState = preloadReducer(true, action);
    expect(nextState).toEqual(false);
  });

  it('should return current state for unknown action', () => {
    const action = {type: 'UNKNOWN_ACTION'};
    const nextState = preloadReducer(true, action);
    expect(nextState).toEqual(true);
  });
});
