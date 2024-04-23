export const USERS_ACTION_TYPE = {
  GET_USERS: 'GET_USERS',
};

export function getUsersAction(users) {
  return {
    type: USERS_ACTION_TYPE.GET_USERS,
    payload: {
      users,
    },
  };
}
