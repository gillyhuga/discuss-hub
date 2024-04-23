import {THREAD_ACTION_TYPE} from './action';

function threadReducer(state = null, action) {
  switch (action.type) {
    case THREAD_ACTION_TYPE.GET_THREAD:
      return action.payload.thread;
    case THREAD_ACTION_TYPE.UNSET_THREAD:
      return null;
    case THREAD_ACTION_TYPE.UP_VOTE_THREAD:
      return {
        ...state,
        upVotesBy: state.upVotesBy.includes(action.payload.userId) ?
          state.upVotesBy.filter((userId) => userId !== action.payload.userId) :
          state.upVotesBy.concat(action.payload.userId),
        downVotesBy: state.downVotesBy.includes(action.payload.userId) ?
          state.downVotesBy.filter(
              (userId) => userId !== action.payload.userId,
          ) :
          state.downVotesBy,
      };
    case THREAD_ACTION_TYPE.DOWN_VOTE_THREAD:
      return {
        ...state,
        downVotesBy: state.downVotesBy.includes(action.payload.userId) ?
          state.downVotesBy.filter(
              (userId) => userId !== action.payload.userId,
          ) :
          state.downVotesBy.concat(action.payload.userId),
        upVotesBy: state.upVotesBy.includes(action.payload.userId) ?
          state.upVotesBy.filter((userId) => userId !== action.payload.userId) :
          state.upVotesBy,
      };

    case THREAD_ACTION_TYPE.CREATE_COMMENT:
      return {
        ...state,
        comments: [action.payload.comment, ...state.comments],
      };
    case THREAD_ACTION_TYPE.UP_VOTE_COMMENT:
      return {
        ...state,
        comments: state.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              upVotesBy: comment.upVotesBy.includes(action.payload.userId) ?
                comment.upVotesBy.filter(
                    (userId) => userId !== action.payload.userId,
                ) :
                comment.upVotesBy.concat(action.payload.userId),
              downVotesBy: comment.downVotesBy.includes(action.payload.userId) ?
                comment.downVotesBy.filter(
                    (userId) => userId !== action.payload.userId,
                ) :
                comment.downVotesBy,
            };
          }
          return comment;
        }),
      };

    case THREAD_ACTION_TYPE.DOWN_VOTE_COMMENT:
      return {
        ...state,
        comments: state.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              downVotesBy: comment.downVotesBy.includes(action.payload.userId) ?
                comment.downVotesBy.filter(
                    (userId) => userId !== action.payload.userId,
                ) :
                comment.downVotesBy.concat(action.payload.userId),
              upVotesBy: comment.upVotesBy.includes(action.payload.userId) ?
                comment.upVotesBy.filter(
                    (userId) => userId !== action.payload.userId,
                ) :
                comment.upVotesBy,
            };
          }
          return comment;
        }),
      };
    default:
      return state;
  }
}
export default threadReducer;
