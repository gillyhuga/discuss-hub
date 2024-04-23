import {hideLoading, showLoading} from 'react-redux-loading-bar';
import {toast} from 'react-hot-toast';
import {threadsApi} from '@/lib/api';

export const THREAD_ACTION_TYPE = {
  GET_THREAD: 'GET_THREAD',
  UNSET_THREAD: 'UNSET_THREAD',
  UP_VOTE_THREAD: 'UP_VOTE_THREAD',
  DOWN_VOTE_THREAD: 'DOWN_VOTE_THREAD',
  CREATE_COMMENT: 'CREATE_COMMENT',
  UP_VOTE_COMMENT: 'UP_VOTE_COMMENT',
  DOWN_VOTE_COMMENT: 'DOWN_VOTE_COMMENT',
};

export function getThreadAction(thread) {
  return {
    type: THREAD_ACTION_TYPE.GET_THREAD,
    payload: {
      thread,
    },
  };
}

export function unsetThreadAction() {
  return {
    type: THREAD_ACTION_TYPE.UNSET_THREAD,
  };
}

export function upVoteThreadAction(userId) {
  return {
    type: THREAD_ACTION_TYPE.UP_VOTE_THREAD,
    payload: {
      userId,
    },
  };
}

export function downVoteThreadAction(userId) {
  return {
    type: THREAD_ACTION_TYPE.DOWN_VOTE_THREAD,
    payload: {
      userId,
    },
  };
}

export function createCommentAction(comment) {
  return {
    type: THREAD_ACTION_TYPE.CREATE_COMMENT,
    payload: {
      comment,
    },
  };
}

export function upVoteCommentAction({userId, commentId}) {
  return {
    type: THREAD_ACTION_TYPE.UP_VOTE_COMMENT,
    payload: {
      userId,
      commentId,
    },
  };
}

export function downVoteCommentAction({userId, commentId}) {
  return {
    type: THREAD_ACTION_TYPE.DOWN_VOTE_COMMENT,
    payload: {
      userId,
      commentId,
    },
  };
}

export const threadThunks = {
  asyncGetThread(threadId) {
    return async (dispatch) => {
      dispatch(showLoading());
      dispatch(unsetThreadAction());
      threadsApi.getThreadById(threadId)
          .then((thread) => {
            dispatch(getThreadAction(thread));
            dispatch(hideLoading());
          })
          .catch((err) => {
            toast.error(err.message);
            dispatch(hideLoading());
          });
    };
  },
  asyncUpVoteThread() {
    return async (dispatch, getState) => {
      dispatch(showLoading());

      const {auth, thread} = getState();
      dispatch(upVoteThreadAction(auth.id));

      try {
        if (thread.upVotesBy.includes(auth.id)) {
          await threadsApi.neutralVoteThread(thread.id);
          toast.success('Thread neutralized successfully.');
        } else {
          await threadsApi.upVoteThread(thread.id);
          toast.success('Thread upvoted successfully.');
        }
      } catch (error) {
        toast.error(error.message);
        dispatch(upVoteThreadAction(auth.id));
      }
      dispatch(hideLoading());
    };
  },
  asyncDownVoteThread() {
    return async (dispatch, getState) => {
      dispatch(showLoading());

      const {auth, thread} = getState();
      dispatch(downVoteThreadAction(auth.id));

      try {
        if (thread.downVotesBy.includes(auth.id)) {
          await threadsApi.neutralVoteThread(thread.id);
          toast.success('Thread neutralized successfully.');
        } else {
          await threadsApi.downVoteThread(thread.id);
          toast.success('Thread downvoted successfully.');
        }
      } catch (error) {
        toast.error(error.message);
        dispatch(downVoteThreadAction(auth.id));
      }

      dispatch(hideLoading());
    };
  },
  asyncCreateComment(content) {
    return async (dispatch, getState) => {
      const threadID = getState().thread.id;
      threadsApi.createComment(content, threadID)
          .then((comment) => {
            dispatch(createCommentAction(comment));
            toast.success('Create thread successfully.');
          })
          .catch((err) => {
            toast.error(err.message);
          });
    };
  },
  asyncUpVoteComment(commentId) {
    return async (dispatch, getState) => {
      dispatch(showLoading());

      const {auth, thread} = getState();
      dispatch(upVoteCommentAction({commentId, userId: auth.id}));

      try {
        thread.comments.map(async (comment) => {
          if (comment.id === commentId) {
            if (comment.upVotesBy.includes(auth.id)) {
              await threadsApi.neutralVoteComment(thread.id, commentId);
              toast.success('Comment neutralized successfully.');
            } else {
              await threadsApi.upVoteComment(thread.id, commentId);
              toast.success('Comment upvoted successfully.');
            }
          }
        });
      } catch (error) {
        toast.error(error.message);
        dispatch(upVoteCommentAction({commentId, userId: auth.id}));
      }

      dispatch(hideLoading());
    };
  },
  asyncDownVoteComment(commentId) {
    return async (dispatch, getState) => {
      dispatch(showLoading());

      const {auth, thread} = getState();
      dispatch(downVoteCommentAction({commentId, userId: auth.id}));

      try {
        thread.comments.map(async (comment) => {
          if (comment.id === commentId) {
            if (comment.downVotesBy.includes(auth.id)) {
              await threadsApi.neutralVoteComment(thread.id, commentId);
              toast.success('Comment neutralized successfully.');
            } else {
              await threadsApi.downVoteComment(thread.id, commentId);
              toast.success('Comment downvoted successfully.');
            }
          }
        });
      } catch (error) {
        toast.error(error.message);
        dispatch(downVoteCommentAction({commentId, userId: auth.id}));
      }

      dispatch(hideLoading());
    };
  },
};
