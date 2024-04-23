import {THREADS_ACTION_TYPE} from './action';

const initialState = [];

function threadsReducer(state = initialState, action) {
  switch (action.type) {
    case THREADS_ACTION_TYPE.GET_ALL_THREAD:
      return action.payload.threads;
    case THREADS_ACTION_TYPE.CREATE_THREAD:
      return [action.payload.thread, ...state];
    case THREADS_ACTION_TYPE.UP_VOTE_THREADS:
      return state.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            upVotesBy: thread.upVotesBy.includes(action.payload.userId) ?
              thread.upVotesBy.filter(
                  (userId) => userId !== action.payload.userId,
              ) :
              thread.upVotesBy.concat([action.payload.userId]),
            downVotesBy: thread.downVotesBy.includes(action.payload.userId) ?
              thread.downVotesBy.filter(
                  (userId) => userId !== action.payload.userId,
              ) :
              thread.downVotesBy,
          };
        }
        return thread;
      });
    case THREADS_ACTION_TYPE.DOWN_VOTE_THREADS:
      return state.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            downVotesBy: thread.downVotesBy.includes(action.payload.userId) ?
              thread.downVotesBy.filter(
                  (userId) => userId !== action.payload.userId,
              ) :
              thread.downVotesBy.concat([action.payload.userId]),
            upVotesBy: thread.upVotesBy.includes(action.payload.userId) ?
              thread.upVotesBy.filter(
                  (userId) => userId !== action.payload.userId,
              ) :
              thread.upVotesBy,
          };
        }

        return thread;
      });
    default:
      return state;
  }
}
export default threadsReducer;
