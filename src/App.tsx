import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './assets/Components/Layout'
import HomePage from './assets/Pages/HomePage'
import TrainingPage from './assets/Pages/TrainingPage'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>  
        <Route index element={<HomePage />} />
        <Route path="Training" element={<TrainingPage />} />
      </Route>
    </Routes>
  )
}

export default App
