import Navbar from './components/Navbar'
import ListPersonas from './components/ListPersonas'
import ListViviendas from './components/ListViviendas'
import ListMunicipios from './components/ListMunicipios'
import ListDepartamentos from './components/ListDepartamentos'
import FormVivienda from './components/FormVivienda'
import FormMunicipio from './components/FormMunicipio'
import FormDepartamento from './components/FormDepartamento'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FormPersona from './components/FormPersona'

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<FormPersona/>} />
          <Route path="/vivienda" element={<FormVivienda />} />
          <Route path="/municipio" element={<FormMunicipio />} />
          <Route path="/departamento" element={<FormDepartamento />} />
          <Route path="/listapersonas" element={<ListPersonas />} />
          <Route path="/listaviviendas" element={<ListViviendas />} />
          <Route path="/lista-municipios" element={<ListMunicipios />} />
          <Route path="/lista-departamentos" element={<ListDepartamentos />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
