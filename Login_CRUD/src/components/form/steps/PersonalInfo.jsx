import '../../../styles/components/steps/personalinfo.sass'

import {FaRegUser} from 'react-icons/fa'

const PersonalInfo = () => {
  return (
    <div className="personal-info-container">
      <form>
      <div className="info">
        <FaRegUser/>
        <input type="text" placeholder="Insira seu nome" />
      </div>
      <div className="info">
        <FaRegUser/>
        <input type="text" placeholder="Insira seu sobrenome"/>
      </div>
      </form>
    </div>
  )
}

export default PersonalInfo