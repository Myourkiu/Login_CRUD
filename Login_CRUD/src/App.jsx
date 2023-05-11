import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'

import './styles/components/app.sass'

import Registro from './components/pages/Registro.jsx'
import Info from './components/pages/Info'
import Login from './components/pages/Login'

function App() {
  return (
    
    <div className="app">
      <Router>
      <Routes>
        <Route path='/' element={<Info/>}/>
        <Route path='/register' element={<Registro/>}/>
        <Route path='/info' element={<Info/>}/>
      </Routes>
    </Router>
    </div>

  )
}

export default App
