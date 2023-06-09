import { FiLogOut } from 'react-icons/fi'

import {Link, useLocation, useNavigate} from 'react-router-dom'
import { useState } from 'react'

import '../../styles/components/info.sass'
import Modal from '../Modal'


const Info = () => {

  const location = useLocation()
  const data = location.state
  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState(false)

  function removeUser(id) {
     fetch(`http://localhost:5000/users/${id}`,{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
    }
     })
     .then((resp) => resp.json())
     .then((data) => {
      navigate('/Login_CRUD')
     })
     .catch((err) => console.log(err))
  }

  const remove = (e) => {
    e.preventDefault()
    removeUser(data.id)
  }

  return (
    <div className='page'>
      <div className='navbar'>
        <Link to='/'><FiLogOut/></Link>
      </div>
      <div className='header'>
        <h1>{data.firstName} {data.lastName}</h1>
      </div>
      <div className='main-content'>
        <p>Nome: {data.firstName}</p>
        <p>Sobrenome: {data.lastName}</p>
        <p>Email: {data.email}</p>
        <p>Celular: {data.phone}</p>
      </div>
      <div className="footer">
        <button className='edit' onClick={() => {navigate(`/user/${data.id}/edit`)}}>Editar</button>
        <button className='delete' onClick={() => {setOpenModal(true)}}>Deletar</button>
      </div>
          <Modal isOpen={openModal}>
            <p>Você realmente deseja excluir sua conta?</p>

            <div className="buttons">
              <button onClick={() => setOpenModal(!openModal)}>Cancelar</button>
              <button className='delete' onClick={remove}>Deletar</button>
            </div>
          </Modal>

      </div>
  )
}

export default Info