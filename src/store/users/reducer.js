import {USERS_ACTION_TYPE} from './action';

function usersReducer(users = [], action = {}) {
  switch (action.type) {
    case USERS_ACTION_TYPE.GET_USERS:
      return action.payload.users;
    default:
      return users;
  }
}

export default usersReducer;
