import './App.css'
import './themes.css'
import { Routes, Route, Link } from 'react-router-dom'
import LevelPage from './pages/LevelPage/LevelPage'
import NotFound from './pages/NotFoundPage/NotFoundPage'
import HomePage from './pages/HomePage/HomePage'
import Sidebar from './components/Sidebar/Sidebar'
import SettingsPage from './pages/SettingPage/SettingPage'
import LevelListPage from './pages/LevelsListPage/LevelsListPage'
import AboutPage from './pages/AboutPage/AboutPage'
import StatisticsPage from './pages/StatisticsPage/StatisticsPage'
function App() {


  return (
    <>
      <div>
        <Sidebar/>
        <Routes>
          <Route path="/" element={< HomePage />} />
          <Route path="/levels" element={< LevelListPage />} />
          <Route path="/level/:levelId" element={< LevelPage />} />
          <Route path="/settings" element={< SettingsPage />} />
          <Route path="/about" element={< AboutPage />} />
          <Route path="/statistics" element={< StatisticsPage />} />
          <Route path='*' element={< NotFound />} />
        </Routes>
      </div>
    </>
  )
}

export default App

