import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'

import './styles/components/app.sass'

import Registro from './components/pages/Registro.jsx'
import Info from './components/pages/Info'
import Login from './components/pages/Login'
import User from './components/pages/User'

function App() {
  return (
    
    <div className="app">
      <Router>
      <Routes>
        <Route path='/Login_CRUD' element={<Login/>}/>
        <Route path='/register' element={<Registro/>}/>
        <Route path='/info/:id' element={<Info/>}/>
        <Route path='/user/:id/edit' element={<User/>}/>
      </Routes>
    </Router>
    </div>

  )
}

export default App
