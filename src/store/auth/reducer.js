import {AUTH_ACTION_TYPE} from './action';

function authReducer(auth = null, action = {}) {
  switch (action.type) {
    case AUTH_ACTION_TYPE.SET_AUTH:
      return action.payload.auth;

    case AUTH_ACTION_TYPE.UNSET_AUTH:
      return null;

    default:
      return auth;
  }
}

export {authReducer};
