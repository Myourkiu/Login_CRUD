import { useState, useEffect } from 'react'
import MaskedInput from '../MaskedInput'

import '../../../styles/components/steps/contactinfo.sass'

import {FaAt, FaPhone} from 'react-icons/fa'

const ContactInfo = ({ formData, setFormData }) => {

    const [msg, setMsg] = useState({
      email: '',
      phone: ''
    })
    const [results, setResults] = useState([])

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
  }, [])

    const emailValidate = (e) => {
      const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g
      const emailVerify = results.find(data => data.email == e.target.value)
      
      setFormData({...formData, email: e.target.value})

      if(!regEx.test(formData.email) || formData.email == ''){
        setMsg({...msg, email: 'Insira um email válido!'})
      }else if(emailVerify){
        setMsg({...msg, email: 'O email já está em uso.'})
      }else setMsg({...msg, email: ''})
    }

    const phoneValidate = (e) => {
      const phoneVerify = results.find(data => data.phone == e.target.value)

      setFormData({...formData, phone: e.target.value})
      
      if(formData.phone.length < 10 || formData.phone == ''){
          setMsg({...msg, phone: 'Insira um número de telefone válido!'})
      }else if(phoneVerify){
        setMsg({...msg, phone: 'O número de telefone já está em uso.'})
      }else setMsg({...msg, phone: ''})
    }

  return (
    <div className="contact-info-container">
      <form>
      <div className="info">
        <FaAt/>
        <input type="email"
        
        placeholder="Insira seu e-mail"
        value={formData.email}
        onChange={emailValidate}/>
      </div>
      <p>{msg.email}</p>
      <div className="info">
        <FaPhone/>
        <MaskedInput 
        mask='(99) 99999-9999'
        value={formData.phone}
        placeholder='Insira o seu telefone'
        onChange={phoneValidate}
        />
      </div>
      <p>{msg.phone}</p>
      </form>
    </div>
  )
}

export default ContactInfo