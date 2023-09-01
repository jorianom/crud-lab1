import Navbar from './components/Navbar'
import FormPersona from './components/FormPersona'
import FormVivienda from './components/FormVivienda'
import FormMunicipio from './components/FormMunicipio'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<FormPersona />} />
          <Route path="/vivienda" element={<FormVivienda />} />
          <Route path="/municipio" element={<FormMunicipio />} />
          <Route path="/list" element={<FormPersona />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
