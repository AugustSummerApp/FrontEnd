import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './assets/Components/Layout'
import HomePage from './assets/Pages/HomePage'
import TrainingPage from './assets/Pages/TrainingPage'
import ProgressPage from './assets/Pages/ProgressPage'
import MacrosPage from './assets/Pages/MacrosPage'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>  
        <Route index element={<HomePage />} />
        <Route path="Training" element={<TrainingPage />} />
        <Route path="Progress" element={<ProgressPage />} />
        <Route path="Macros" element={<MacrosPage />} />
      </Route>
    </Routes>
  )
}

export default App
