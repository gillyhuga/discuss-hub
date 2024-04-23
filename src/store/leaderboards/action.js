import {hideLoading, showLoading} from 'react-redux-loading-bar';
import toast from 'react-hot-toast';
import {leaderboardsApi} from '@/lib/api';

export const LEADERBOARDS_ACTION_TYPE = {
  GET_LEADERBOARDS: 'GET_LEADERBOARDS',
};

export function getLeaderboardAction(leaderboards) {
  return {
    type: LEADERBOARDS_ACTION_TYPE.GET_LEADERBOARDS,
    payload: {
      leaderboards,
    },
  };
}

export const leaderboardThunks = {
  asyncGetLeaderboards() {
    return async (dispatch) => {
      dispatch(showLoading());
      leaderboardsApi.getLeaderboards()
          .then((leaderboards) => {
            dispatch(getLeaderboardAction(leaderboards));
            dispatch(hideLoading());
          })
          .catch((err) => {
            toast.error(err.message);
            dispatch(hideLoading());
          });
    };
  },
};
