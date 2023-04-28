import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'

import './styles/components/app.sass'

import Registro from './components/pages/Registro.jsx'
import Info from './components/pages/Info'
import Login from './components/pages/Login'

function App() {
  return (
    
    <Router>
      <Routes>
        <Route path='/' element={<Registro/>}/>
        <Route path='/register' element={<Registro/>}/>
        <Route path='/info' element={<Info/>}/>
      </Routes>
    </Router>

  )
}

export default App
