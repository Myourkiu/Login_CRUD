import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'

import './styles/components/app.sass'

import Info from './components/pages/Info'
import User from './components/pages/User'
import PassEdit from './components/pages/PassEdit'
import RegisterForm from './components/form/RegisterForm'
import LoginForm from './components/form/LoginForm'

function App() {
  return (
    
    <div className="app">
      <Router>
      <Routes>
        <Route path='/' element={<LoginForm/>}/>
        <Route path='/register' element={<RegisterForm/>}/>
        <Route path='/info/:id' element={<Info/>}/>
        <Route path='/user/:id/edit' element={<User/>}/>
        <Route path='/user/:id/edit/password' element={<PassEdit/>}/>
      </Routes>
    </Router>
    </div>

  )
}

export default App
