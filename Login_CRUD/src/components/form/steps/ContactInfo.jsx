import '../../../styles/components/steps/contactinfo.sass'

import {FaAt, FaPhone} from 'react-icons/fa'

const ContactInfo = () => {
  return (
    <div className="contact-info-container">
      <form>
      <div className="info">
        <FaAt/>
        <input type="email" placeholder="Insira seu e-mail" />
      </div>
      <div className="info">
        <FaPhone/>
        <input type="text" placeholder="Insira seu celular"/>
      </div>
      </form>
    </div>
  )
}

export default ContactInfo