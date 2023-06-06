import Image from '../../img/image.svg'

import {FaLock, FaAt} from 'react-icons/fa'

import '../../styles/components/loginform.sass'

import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import bcrypt from 'bcryptjs'

const LoginForm = () => {

  const [results, setResults] = useState([])
  const [msgEmail, setMsgEmail] = useState('')
  const [msgPassword, setMsgPassword] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate()

 
    useEffect(() => {
        fetch('http://localhost:5000/users',{
          method: 'GET',
          headers:{
            'Content-Type': 'application/json',
          }
        })
        .then((resp) => resp.json())
        .then((data) => {
          setResults(data)
        })
        .catch((err) => console.log(err))
    },[])

    const Verify = (e) => {
      e.preventDefault()

      if(results.length > 0){
        const user = results.find(u => u.email == formData.email)
        
        if(formData.email == ''){
          setMsgEmail('Preencha este campo')
        }
        
        if(formData.password == ''){
          setMsgPassword('Preencha este campo')
        }

        if(user == undefined){
          setMsgEmail('O email não existe!')
        }else {setMsgEmail('')}

        bcrypt.compare(formData.password, user.password, function(err, isMatch) {
          if(err){
            console.log(err)
          }else if(!isMatch){
            setMsgPassword('Senha incorreta!')
          }else{
            setMsgPassword('')
            navigate(`/info/${user.id}` , {state: user})
            
          }
        })
      }
    }

    
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
              <input type="text"
               placeholder='Insira seu e-mail'
               onChange={(e) => {setFormData({...formData, email: e.target.value})}}
               value={formData.email}
               />
               
            </div>
            
            <p>{msgEmail}</p>

            <div className="info">
              <FaLock/>
              <input type='password' 
              placeholder='Insira sua senha'
              onChange={(e) => {setFormData({...formData, password: e.target.value})}}
              value={formData.password}
              />
            </div>
            <p>{msgPassword}</p>

            <Link to='/register'>Não possui uma conta? Registre-se</Link>

            <button onClick={Verify}>Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginForm