/**
 * Scenario test for threadsReducer
 * * - threadsReducer function
 *   - should return the initial state
 *   - should handle THREADS_ACTION_TYPE.GET_ALL_THREAD
 *   - should handle THREADS_ACTION_TYPE.CREATE_THREAD
 *   - should handle THREADS_ACTION_TYPE.UP_VOTE_THREADS
 *   - should handle THREADS_ACTION_TYPE.DOWN_VOTE_THREADS
 *   - should handle unknown action without modifying state
 *   - should handle UP_VOTE_THREADS for non-existing thread
 *   - should handle DOWN_VOTE_THREADS for non-existing thread
 */

import {describe, it, expect} from 'vitest';
import threadsReducer from './reducer';
import {THREADS_ACTION_TYPE} from './action';

describe('threadsReducer', () => {
  const initialState = [
    {
      id: 'thread-L8j3cpxkoLpDyTAb',
      title: 'Thread Test',
      body: 'Lorem ipsum dolor sit amet',
      category: 'testing',
      createdAt: '2024-04-26T17:11:45.842Z',
      ownerId: 'user-aROWej8yYA1sOfHN',
      totalComments: 0,
      upVotesBy: [],
      downVotesBy: [],
    },
    {
      id: 'thread-91KocEqYPRz68MhD',
      title: 'Thread Test',
      body: 'Lorem ipsum dolor sit amet',
      category: 'testing',
      createdAt: '2024-04-26T17:11:45.842Z',
      ownerId: 'user-aROWej8yYA1sOfHN',
      totalComments: 1,
      upVotesBy: [],
      downVotesBy: [],
    },
  ];

  const newThread = {
    id: 'thread-Np47p4jhUXYhrhRn',
    title: 'Thread Create Test',
    body: 'Lorem ipsum dolor sit amet',
    category: 'testing',
    createdAt: '2024-04-26T17:11:45.842Z',
    ownerId: 'user-aROWej8yYA1sOfHN',
    totalComments: 1,
    upVotesBy: [],
    downVotesBy: [],
  };

  it('should return the initial state', () => {
    const action = {type: 'UNKNOWN_ACTION'};
    const nextState = threadsReducer(initialState, action);
    expect(nextState).toEqual(initialState);
  });

  it('should handle THREADS_ACTION_TYPE.GET_ALL_THREAD', () => {
    const action = {
      type: THREADS_ACTION_TYPE.GET_ALL_THREAD,
      payload: {
        threads: [...initialState],
      },
    };
    const nextState = threadsReducer(initialState, action);
    expect(nextState).toEqual(action.payload.threads);
  });

  it('should handle THREADS_ACTION_TYPE.CREATE_THREAD', () => {
    const action = {
      type: THREADS_ACTION_TYPE.CREATE_THREAD,
      payload: {
        thread: newThread,
      },
    };
    const nextState = threadsReducer(initialState, action);
    expect(nextState).toEqual([newThread, ...initialState]);
  });

  it('should handle THREADS_ACTION_TYPE.UP_VOTE_THREADS', () => {
    const action = {
      type: THREADS_ACTION_TYPE.UP_VOTE_THREADS,
      payload: {
        threadId: 'thread-91KocEqYPRz68MhD',
        userId: 'user-aROWej8yYA1sOfHN',
      },
    };
    const nextState = threadsReducer(initialState, action);
    expect(nextState[1].upVotesBy).toEqual([action.payload.userId]);
    expect(nextState[1].downVotesBy).toEqual([]);
  });

  it('should handle THREADS_ACTION_TYPE.DOWN_VOTE_THREADS', () => {
    const action = {
      type: THREADS_ACTION_TYPE.DOWN_VOTE_THREADS,
      payload: {
        threadId: 'thread-91KocEqYPRz68MhD',
        userId: 'user-aROWej8yYA1sOfHN',
      },
    };
    const nextState = threadsReducer(initialState, action);
    expect(nextState[1].downVotesBy).toEqual([action.payload.userId]);
    expect(nextState[1].upVotesBy).toEqual([]);
  });

  it('should handle unknown action without modifying state', () => {
    const action = {type: 'UNKNOWN_ACTION'};
    const nextState = threadsReducer(initialState, action);
    expect(nextState).toEqual(initialState);
  });

  it('should handle UP_VOTE_THREADS for non-existing thread', () => {
    const action = {
      type: THREADS_ACTION_TYPE.UP_VOTE_THREADS,
      payload: {
        threadId: 'non-existing-thread-id',
        userId: 'user-aROWej8yYA1sOfHN',
      },
    };
    const nextState = threadsReducer(initialState, action);
    expect(nextState).toEqual(initialState);
  });

  it('should handle DOWN_VOTE_THREADS for non-existing thread', () => {
    const action = {
      type: THREADS_ACTION_TYPE.DOWN_VOTE_THREADS,
      payload: {
        threadId: 'non-existing-thread-id',
        userId: 'user-aROWej8yYA1sOfHN',
      },
    };
    const nextState = threadsReducer(initialState, action);
    expect(nextState).toEqual(initialState);
  });
});
