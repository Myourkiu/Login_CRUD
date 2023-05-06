import '../../../styles/components/steps/passcreate.sass'

import {FaLock} from 'react-icons/fa'

const PassCreate = () => {
  return (
    <div className="passcreate-container">
      <form> 
        <div className='info'>
          <FaLock/>
                <input type="password" placeholder="Insira sua senha" />
        </div>
        <div className='info'>
          <FaLock/>
        <input type="password" placeholder="Confirme sua senha"/>
        </div>
      </form>
    </div>
  )
}

export default PassCreate