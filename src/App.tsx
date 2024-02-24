import { Routes, Route } from 'react-router-dom';
import Home from '../src/pages/Home'
import Layout from './components/Layout';
import Leaderboard from './pages/Leaderboard';

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/leaderboards" element={<Leaderboard />} />
      </Route>
    </Routes>
  );
};

export default App;
