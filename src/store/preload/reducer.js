import {PRELEOAD_ACTION_TYPE} from './action';

function preloadReducer(preload = true, action = {}) {
  switch (action.type) {
    case PRELEOAD_ACTION_TYPE.SET_PRELOAD:
      return action.payload.preload;

    default:
      return preload;
  }
}

export {preloadReducer};
