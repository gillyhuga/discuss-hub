import {hideLoading, showLoading} from 'react-redux-loading-bar';
import toast from 'react-hot-toast';
import {threadsApi} from '@/lib/api';

export const THREADS_ACTION_TYPE = {
  CREATE_THREAD: 'CREATE_THREAD',
  GET_ALL_THREAD: 'GET_ALL_THREAD',
  UP_VOTE_THREADS: 'UP_VOTE_THREADS',
  NEUTRAL_VOTE_THREADS: 'NEUTRAL_VOTE_THREADS',
  DOWN_VOTE_THREADS: 'DOWN_VOTE_THREADS',
};

export function getAllThreadAction(threads) {
  return {
    type: THREADS_ACTION_TYPE.GET_ALL_THREAD,
    payload: {
      threads,
    },
  };
}

export function createThreadAction(thread) {
  return {
    type: THREADS_ACTION_TYPE.CREATE_THREAD,
    payload: {
      thread,
    },
  };
}

function upVoteThreadAction({threadId, userId}) {
  return {
    type: THREADS_ACTION_TYPE.UP_VOTE_THREADS,
    payload: {
      threadId,
      userId,
    },
  };
}

function downVoteThreadAction({threadId, userId}) {
  return {
    type: THREADS_ACTION_TYPE.DOWN_VOTE_THREADS,
    payload: {
      threadId,
      userId,
    },
  };
}

export const threadsThunks = {
  asyncCreateThread(thread) {
    return (dispatch) => {
      threadsApi.createThread(thread)
          .then((thread) => {
            dispatch(createThreadAction(thread));
            toast.success('Thread created successfully!');
          })
          .catch((err) => {
            toast.error(err.message);
          });
    };
  },
  asyncUpVoteThread(threadId) {
    return async (dispatch, getState) => {
      dispatch(showLoading());
      const {threads, auth} = getState();
      dispatch(upVoteThreadAction({threadId, userId: auth.id}));
      try {
        threads.forEach(async (thread) => {
          if (thread.id === threadId) {
            if (thread.upVotesBy.includes(auth.id)) {
              await threadsApi.neutralVoteThread(threadId);
              toast.success('Thread neutralized successfully.');
            } else {
              await threadsApi.upVoteThread(threadId);
              toast.success('Thread upvoted successfully.');
            }
          }
        });
      } catch (error) {
        toast.error(error.message);
        dispatch(upVoteThreadAction({threadId, userId: auth.id}));
      }

      dispatch(hideLoading());
    };
  },

  asyncDownVoteThread(threadId) {
    return (dispatch, getState) => {
      dispatch(showLoading());

      const {threads, auth} = getState();
      dispatch(downVoteThreadAction({threadId, userId: auth.id}));

      try {
        threads.forEach(async (thread) => {
          if (thread.id === threadId) {
            if (thread.downVotesBy.includes(auth.id)) {
              await threadsApi.neutralVoteThread(threadId);
              toast.success('Thread neutralized successfully.');
            } else {
              await threadsApi.downVoteThread(threadId);
              toast.success('Thread downvoted successfully.');
            }
          }
        });
      } catch (error) {
        toast.error(error.message);
        dispatch(downVoteThreadAction({threadId, userId: auth.id}));
      }

      dispatch(hideLoading());
    };
  },
};
