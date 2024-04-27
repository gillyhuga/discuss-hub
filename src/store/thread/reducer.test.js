/**
 * Scenario test for threadReducer
 * * - threadReducer function
 *   - should handle THREAD_ACTION_TYPE.GET_THREAD
 *   - should handle THREAD_ACTION_TYPE.UNSET_THREAD
 *   - should handle THREAD_ACTION_TYPE.UP_VOTE_THREAD
 *   - should handle THREAD_ACTION_TYPE.DOWN_VOTE_THREAD
 *   - should handle THREAD_ACTION_TYPE.CREATE_COMMENT
 *   - should handle THREAD_ACTION_TYPE.UP_VOTE_COMMENT
 *   - should handle THREAD_ACTION_TYPE.DOWN_VOTE_COMMENT
 */

import {describe, it, expect} from 'vitest';
import threadReducer from './reducer';
import {THREAD_ACTION_TYPE} from './action';

const initialState = () => ({
  id: 'thread-xBqcjazWG8xj_W4v',
  title: 'Testing Thread',
  body: 'Testing Thread',
  createdAt: '2024-04-27T13:02:58.068Z',
  owner: {
    id: 'user-CxKB8668YtusCQW5',
    name: 'Gilly',
    avatar: 'https://ui-avatars.com/api/?name=Gilly&background=random',
  },
  category: 'test',
  comments: [
    {
      id: 'comment-XhqYiuyhZm1mWHqn',
      content: 'Testing Thread.',
      createdAt: '2023-05-29T07:59:04.689Z',
      owner: {
        id: 'user-mQhLzINW_w5TxxYf',
        name: 'Gilly',
        avatar: 'https://ui-avatars.com/api/?name=Gilly&background=random',
      },
      upVotesBy: [],
      downVotesBy: [],
    },
  ],
  upVotesBy: [],
  downVotesBy: [],
});

describe('threadReducer', () => {
  it('should return the initial state', () => {
    const action = {type: 'UNKNOWN_ACTION'};
    const nextState = threadReducer(null, action);
    expect(nextState).toEqual(null);
  });

  it('should handle THREAD_ACTION_TYPE.GET_THREAD', () => {
    const action = {
      type: THREAD_ACTION_TYPE.GET_THREAD,
      payload: initialState(),
    };
    const nextState = threadReducer(null, action);
    expect(nextState).toEqual(action.payload.thread);
  });

  it('should handle THREAD_ACTION_TYPE.UNSET_THREAD', () => {
    const action = {type: THREAD_ACTION_TYPE.UNSET_THREAD};
    const nextState = threadReducer([], action);
    expect(nextState).toEqual(null);
  });

  it('should handle THREAD_ACTION_TYPE.UP_VOTE_THREAD', () => {
    const action = {
      type: THREAD_ACTION_TYPE.UP_VOTE_THREAD,
      payload: {
        userId: 'user-CxKB8668YtusCQW5',
        threadId: 'thread-xBqcjazWG8xj_W4v',
      },
    };
    const prevState = initialState();
    const nextState = threadReducer(prevState, action);
    expect(nextState.upVotesBy).toEqual(['user-CxKB8668YtusCQW5']);
  });

  it('should handle THREAD_ACTION_TYPE.DOWN_VOTE_THREAD', () => {
    const action = {
      type: THREAD_ACTION_TYPE.DOWN_VOTE_THREAD,
      payload: {
        userId: 'user-CxKB8668YtusCQW5',
        threadId: 'thread-xBqcjazWG8xj_W4v',
      },
    };
    const prevState = initialState();
    const nextState = threadReducer(prevState, action);
    expect(nextState.downVotesBy).toEqual(['user-CxKB8668YtusCQW5']);
  });

  it('should handle THREAD_ACTION_TYPE.CREATE_COMMENT', () => {
    const action = {
      type: THREAD_ACTION_TYPE.CREATE_COMMENT,
      payload: {
        comment: {
          id: 'comment-2',
          content: 'Ini adalah komentar Kedua',
          createdAt: '2021-06-22T07:00:00.000Z',
          owner: {
            id: 'users-2',
            name: 'John Doe Test',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      },
    };
    const prevState = initialState();
    const nextState = threadReducer(prevState, action);
    expect(nextState).toEqual({
      ...prevState,
      comments: [
        action.payload.comment,
        ...prevState.comments,
      ],
    });
  });

  it('should handle THREAD_ACTION_TYPE.UP_VOTE_COMMENT', () => {
    const action = {
      type: THREAD_ACTION_TYPE.UP_VOTE_COMMENT,
      payload: {
        userId: 'user-CxKB8668YtusCQW5',
        commentId: 'comment-XhqYiuyhZm1mWHqn',
      },
    };
    const prevState = initialState();
    const nextState = threadReducer(prevState, action);
    expect(nextState.comments[0].upVotesBy).toEqual(['user-CxKB8668YtusCQW5']);
  });

  it('should handle THREAD_ACTION_TYPE.DOWN_VOTE_COMMENT', () => {
    const action = {
      type: THREAD_ACTION_TYPE.DOWN_VOTE_COMMENT,
      payload: {
        userId: 'user-CxKB8668YtusCQW5',
        commentId: 'comment-XhqYiuyhZm1mWHqn',
      },
    };
    const prevState = initialState();
    const nextState = threadReducer(prevState, action);
    expect(nextState.comments[0].downVotesBy).toEqual(
        ['user-CxKB8668YtusCQW5'],
    );
  });
});
