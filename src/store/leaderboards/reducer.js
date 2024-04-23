import {LEADERBOARDS_ACTION_TYPE} from './action';

const initialState = [];

function leaderboardReducer(state = initialState, action) {
  switch (action.type) {
    case LEADERBOARDS_ACTION_TYPE.GET_LEADERBOARDS:
      return action.payload.leaderboards;
    default:
      return state;
  }
}
export default leaderboardReducer;
