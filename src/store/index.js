import {configureStore} from '@reduxjs/toolkit';
import {loadingBarReducer} from 'react-redux-loading-bar';
import usersReducer from '@/store/users/reducer';
import leaderboardReducer from '@/store/leaderboards/reducer';
import {authReducer} from './auth/reducer';
import {preloadReducer} from './preload/reducer';
import threadReducer from '@/store/thread/reducer';
import threadsReducer from '@/store/threads/reducer';

export const store = configureStore({
  reducer: {
    threads: threadsReducer,
    leaderboards: leaderboardReducer,
    users: usersReducer,
    auth: authReducer,
    preload: preloadReducer,
    loadingBar: loadingBarReducer,
    thread: threadReducer,
  },
});
