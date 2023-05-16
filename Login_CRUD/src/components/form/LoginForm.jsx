import Image from '../../img/image.svg'

import {FaLock, FaAt} from 'react-icons/fa'

import '../../styles/components/loginform.sass'
import { Link } from 'react-router-dom'

const LoginForm = () => {
  return (
    <div className='main-login'>
      <div className="left-login">
        <h1>Faça login <br/>E tenha acesso às suas informações</h1>
        <img src={Image} alt='imagem' className='left-login-image' />
      </div>
      <div className="right-login">
        <div className="card-login">
          <h1>Login</h1>
          <form className='form'>
            <div className="info">
              <FaAt/>
              <input type="text" placeholder='Insira seu e-mail'/>
            </div>

            <div className="info">
              <FaLock/>
              <input type='password' placeholder='Insira sua senha'/>
            </div>

            <Link to='/register'>Não possui uma conta? Registre-se</Link>

            <button>Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginForm