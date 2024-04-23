import {API_BASE_URL} from '@/lib/api';

const leaderboardsApi = {
  async getLeaderboards() {
    const promise = new Promise((resolve, reject) => {
      fetch(`${API_BASE_URL}/leaderboards`)
          .then((res) => res.json())
          .then((res) => {
            if (res.status === 'success') {
              resolve(res.data.leaderboards);
            } else {
              const err = new Error(res.message);
              reject(err);
            }
          });
    });
    return promise;
  },
};

export {leaderboardsApi};
