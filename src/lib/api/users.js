import {API_BASE_URL} from '@/lib/api';

const usersApi = {
  async getUsers() {
    const promise = new Promise((resolve, reject) => {
      fetch(`${API_BASE_URL}/users`)
          .then((res) => res.json())
          .then((res) => {
            if (res.status === 'success') {
              resolve(res.data.users);
            } else {
              const err = new Error(res.message);
              reject(err);
            }
          });
    });
    return promise;
  },

  async getProfile() {
    const promise = new Promise((resolve) => {
      const accessToken = localStorage.getItem('accessToken');
      fetch(`${API_BASE_URL}/users/me`, {
        headers: {Authorization: `Bearer ${accessToken}`},
      })
          .then((res) => res.json())
          .then((res) => {
            resolve(res);
          });
    });
    return promise;
  },
};

export {usersApi};
