import { Routes, Route } from 'react-router-dom'
import Layout from '@/components/Layout'
import LoginPage from '@/pages/Login'
import HomePage from '@/pages/Home'
import LeaderboardPage from '@/pages/Leaderboard'
import RegisterPage from '@/pages/Register'

function App (): JSX.Element {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/leaderboards" element={<LeaderboardPage />} />
      </Route>
    </Routes>
  )
}

export default App
