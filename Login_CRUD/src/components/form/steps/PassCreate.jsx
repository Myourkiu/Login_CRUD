import { useRef, useState } from 'react'

import '../../../styles/components/steps/passcreate.sass'

import {FaLock} from 'react-icons/fa'

const PassCreate = ({ formData, setFormData }) => {
  const [msgPass, setMsgPass] = useState('')
  const [msgConfirm, setMsgConfirm] = useState('')

  const passwordValidate = (e) => {

    if(formData.password.length < 7){
      setMsgPass('Sua senha precisa ter no mínimo 8 caracteres.')
    }else setMsgPass('')
    setFormData({...formData, password: e.target.value})
  }

  const confirmValidate = (e) => {
    
    if(!(formData.password == e.target.value)){
      setMsgConfirm('As senhas precisam ser compatíveis.')
    }else setMsgConfirm('')
    setFormData({...formData, confirmPassword: e.target.value})
  }

  return (
    <div className="passcreate-container">
      <form> 
        <div className='info'>
          <FaLock/>
                <input type="password" 
                placeholder="Insira sua senha"
                onPaste={(e)=>{ 
                e.preventDefault() 
                return false}}
                value={formData.password}
                onChange={passwordValidate}
                 />
        </div>
        <div className="error-msg">
          <p>{msgPass}</p>
        </div>
        <div className='info'>
          <FaLock/>
        <input type="password" 
        placeholder="Confirme sua senha"
        onPaste={(e)=>{ 
          e.preventDefault() 
          return false}}
        value={formData.confirmPassword}
        onChange={confirmValidate}
        />
        </div>
        <div className="error-msg">
          <p>{msgConfirm}</p>
        </div>
      </form>
    </div>
  )
}

export default PassCreate