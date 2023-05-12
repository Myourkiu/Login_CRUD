import '../../../styles/components/steps/passcreate.sass'

import {FaLock} from 'react-icons/fa'

const PassCreate = ({ formData, setFormData, msg }) => {
  return (
    <div className="passcreate-container">
      <form> 
        <div className='info'>
          <FaLock/>
                <input type="password" 
                placeholder="Insira sua senha"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})} />
        </div>
        <div className='info'>
          <FaLock/>
        <input type="password" 
        placeholder="Confirme sua senha"
        value={formData.confirmPassword}
        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}/>
        </div>
      </form>
    </div>
  )
}

export default PassCreate