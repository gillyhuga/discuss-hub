export const USERS_ACTION_TYPE = {
  GET_USERS: 'users/set',
};

export function getUsersAction(users) {
  return {
    type: USERS_ACTION_TYPE.GET_USERS,
    payload: {
      users,
    },
  };
}
