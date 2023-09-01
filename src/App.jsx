import Navbar from './components/Navbar'
import FormPersona from './components/FormPersona'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<FormPersona />} />
          <Route path="/vivienda" element={<FormPersona />} />
          <Route path="/municipio" element={<FormPersona />} />
          <Route path="/list" element={<FormPersona />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
