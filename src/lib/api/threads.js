import {API_BASE_URL} from '@/lib/api';

const threadsApi = {
  async getAllThreads() {
    const promise = new Promise((resolve, reject) => {
      fetch(`${API_BASE_URL}/threads`)
          .then((res) => res.json())
          .then((res) => {
            if (res.status === 'success') {
              resolve(res.data.threads);
            } else {
              const err = new Error(res.message);
              reject(err);
            }
          });
    });
    return promise;
  },

  async createThread(thread) {
    const promise = new Promise((resolve, reject) => {
      const accessToken = localStorage.getItem('accessToken');
      fetch(`${API_BASE_URL}/threads`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(thread),
      })
          .then((res) => res.json())
          .then((res) => {
            if (res.status === 'success') {
              resolve(res.data.thread);
            } else {
              const err = new Error(res.message);
              reject(err);
            }
          });
    });
    return promise;
  },

  async getThreadById(threadId) {
    const promise = new Promise((resolve, reject) => {
      fetch(`${API_BASE_URL}/threads/${threadId}`)
          .then((res) => res.json())
          .then((res) => {
            if (res.status === 'success') {
              resolve(res.data.detailThread);
            } else {
              const err = new Error(res.message);
              reject(err);
            }
          });
    });
    return promise;
  },

  async upVoteThread(threadId) {
    const accessToken = localStorage.getItem('accessToken');
    const promise = new Promise((resolve, reject) => {
      fetch(`${API_BASE_URL}/threads/${threadId}/up-vote`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
          .then((res) => res.json())
          .then((res) => {
            if (res.status === 'success') {
              resolve();
            } else {
              const err = new Error(res.message);
              reject(err);
            }
          });
    });
    return promise;
  },

  async downVoteThread(threadId) {
    const accessToken = localStorage.getItem('accessToken');
    const promise = new Promise((resolve, reject) => {
      fetch(`${API_BASE_URL}/threads/${threadId}/down-vote`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
          .then((res) => res.json())
          .then((res) => {
            if (res.status === 'success') {
              resolve();
            } else {
              const err = new Error(res.message);
              reject(err);
            }
          });
    });
    return promise;
  },

  async neutralVoteThread(threadId) {
    const accessToken = localStorage.getItem('accessToken');
    const promise = new Promise((resolve, reject) => {
      fetch(`${API_BASE_URL}/threads/${threadId}/neutral-vote`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
          .then((res) => res.json())
          .then((res) => {
            if (res.status === 'success') {
              resolve();
            } else {
              const err = new Error(res.message);
              reject(err);
            }
          });
    });
    return promise;
  },

  createComment(content, threadID) {
    const accessToken = localStorage.getItem('accessToken');
    const promise = new Promise((resolve, reject) => {
      fetch(`${API_BASE_URL}/threads/${threadID}/comments`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({content}),
      })
          .then((res) => res.json())
          .then((res) => {
            if (res.status === 'success') {
              resolve(res.data.comment);
            } else {
              const err = new Error(res.message);
              reject(err);
            }
          });
    });
    return promise;
  },

  async upVoteComment(threadId, commentId) {
    const accessToken = localStorage.getItem('accessToken');
    const promise = new Promise((resolve, reject) => {
      fetch(
          `${API_BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }).then((res) => res.json())
          .then((res) => {
            if (res.status === 'success') {
              resolve();
            } else {
              const err = new Error(res.message);
              reject(err);
            }
          });
    });
    return promise;
  },

  async neutralVoteComment(threadId, commentId) {
    const accessToken = localStorage.getItem('accessToken');
    const promise = new Promise((resolve, reject) => {
      fetch(API_BASE_URL +
        `/threads/${threadId}/comments/${commentId}/neutral-vote`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((res) => res.json())
          .then((res) => {
            if (res.status === 'success') {
              resolve();
            } else {
              const err = new Error(res.message);
              reject(err);
            }
          });
    });
    return promise;
  },

  async downVoteComment(threadId, commentId) {
    const accessToken = localStorage.getItem('accessToken');
    const promise = new Promise((resolve, reject) => {
      fetch(API_BASE_URL +
        `/threads/${threadId}/comments/${commentId}/down-vote`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((res) => res.json())
          .then((res) => {
            if (res.status === 'success') {
              resolve();
            } else {
              const err = new Error(res.message);
              reject(err);
            }
          });
    });
    return promise;
  },
};

export {threadsApi};
