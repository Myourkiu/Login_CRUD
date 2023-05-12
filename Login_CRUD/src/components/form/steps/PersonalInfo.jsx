import '../../../styles/components/steps/personalinfo.sass'

import {FaRegUser} from 'react-icons/fa'

const PersonalInfo = ({ formData, setFormData, msg }) => {

  return (
    <div className="personal-info-container">
      <form>
      <div className="info">
        <FaRegUser/>
        <input type="text" 
        placeholder="Insira seu nome" 
        value={formData.firstName}
        onChange={(e) => setFormData({...formData, firstName: e.target.value})}/>
      </div>
      
      <div className="info">
        <FaRegUser/>
        <input type="text" 
        placeholder="Insira seu sobrenome"
        value={formData.lastName}
        onChange={(e) => setFormData({...formData, lastName: e.target.value})}/>
      </div>
      </form>
    </div>
  )
}

export default PersonalInfo