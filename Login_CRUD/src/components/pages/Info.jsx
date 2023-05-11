import { FiLogOut } from 'react-icons/fi'

import {Link} from 'react-router-dom'

import '../../styles/components/info.sass'

const Info = () => {
  return (
    <div className='page'>
      <div className='navbar'>
        <Link to='/'><a><FiLogOut/></a></Link>
      </div>
      <div className='header'>
        <h1>User's name</h1>
      </div>
      <div className='main-content'>
        <p>Nome: </p>
        <p>Sobrenome: </p>
        <p>Email:</p>
        <p>Celular: </p>
      </div>
      <div className="footer">
        <button className='edit'>Editar</button>
        <button className='delete'>Deletar</button>
      </div>
    </div>
  )
}

export default Info