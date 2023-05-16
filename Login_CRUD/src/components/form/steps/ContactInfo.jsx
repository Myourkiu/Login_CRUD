import { useState } from 'react'
import MaskedInput from '../MaskedInput'

import '../../../styles/components/steps/contactinfo.sass'

import {FaAt, FaPhone} from 'react-icons/fa'

const ContactInfo = ({ formData, setFormData}) => {

    const [msgEmail, setMsgEmail] = useState('')
    const [msgPhone, setMsgPhone] = useState('')

    const emailValidate = (e) => {
      const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g

      setFormData({...formData, email: e.target.value})

      if(!regEx.test(formData.email) || formData.email == ''){
        setMsgEmail('Insira um email válido!')
      }else setMsgEmail('')
    }

    const phoneValidate = (e) => {
      setFormData({...formData, phone: e.target.value})
      
      if(formData.phone.length < 10 || formData.phone == ''){
        setMsgPhone('Insira um número de telefone válido!')
      }else setMsgPhone('')
    }

console.log(formData)
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
      <p>{msgEmail}</p>
      <div className="info">
        <FaPhone/>
        <MaskedInput 
        mask='(99) 99999-9999'
        value={formData.phone}
        placeholder='Insira o seu telefone'
        onChange={phoneValidate}
        />
      </div>
      <p>{msgPhone}</p>
      </form>
    </div>
  )
}

export default ContactInfo