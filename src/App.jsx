import {Routes, Route} from 'react-router-dom';
import Layout from '@/components/Layout';
import LoginPage from '@/pages/Login';
import HomePage from '@/pages/Home';
import LeaderboardPage from '@/pages/Leaderboard';
import 'nprogress/nprogress.css';
import {useDispatch} from 'react-redux';
import {asyncPreloadProcess} from '@/store/preload/action';
import {useEffect} from 'react';
import RegisterPage from './pages/Register';
import ThreadDetailPage from './pages/DetailPage';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/threads/:id' element={<ThreadDetailPage />} />
        <Route path='/leaderboards' element={<LeaderboardPage />} />
      </Route>
    </Routes>
  );
}

export default App;
