import { useState } from 'react'
import '../../../styles/components/steps/personalinfo.sass'

import {FaRegUser} from 'react-icons/fa'

const PersonalInfo = ({ formData, setFormData}) => {

  const [msgName, setMsgName] = useState('')
  const [msgLastName, setMsgLastName] = useState('')

  const nameValidate = (e) => {
    const regExResult = e.target.value.replace(/[^a-z]/gi, '')

    setFormData({...formData, firstName: regExResult})
    if(formData.firstName.length < 3 || formData.firstName == ''){
      setMsgName('O nome precisa ter no mínimo 3 caracteres!')
    }else 
    setMsgName('')
  }

  const lastNameValidate = (e) => {
    const result = e.target.value.replace(/[^a-z]/gi, '')

    setFormData({...formData, lastName: result})

    if(formData.lastName.length < 3 || formData.lastName == ''){
      setMsgLastName('O sobrenome precisa ter no mínimo 3 caracteres!')
    }else setMsgLastName('')
  }

  return (
    <div className="personal-info-container">
      <form>
      <div className="info">
        <FaRegUser/>
        <input type="text" 
        placeholder="Insira seu nome" 
        value={formData.firstName}
        onChange={nameValidate}/>
      </div>
      <p>{msgName}</p>
      <div className="info">
        <FaRegUser/>
        <input type="text" 
        placeholder="Insira seu sobrenome"
        value={formData.lastName}
        onChange={lastNameValidate}/>
      </div>
      <p>{msgLastName}</p>
      </form>
    </div>
  )
}

export default PersonalInfo