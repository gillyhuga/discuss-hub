import {API_BASE_URL} from '@/lib/api';

const authApi = {
  async login(user) {
    const promise = new Promise((resolve, reject) => {
      fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user),
      })
          .then((res) => res.json())
          .then((res) => {
            if (res.status === 'success') {
              resolve(res.data.token);
            } else {
              const err = new Error(res.message);
              reject(err);
            }
          });
    });
    return promise;
  },
  async register(user) {
    const promise = new Promise((resolve, reject) => {
      fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user),
      })
          .then((res) => res.json())
          .then((res) => {
            if (res.status === 'success') {
              resolve();
            } else {
              reject(res);
            }
          });
    });
    return promise;
  },

};

export {authApi};
