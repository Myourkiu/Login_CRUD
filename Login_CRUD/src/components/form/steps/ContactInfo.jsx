import '../../../styles/components/steps/contactinfo.sass'

import {FaAt, FaPhone} from 'react-icons/fa'

const ContactInfo = ({ formData, setFormData, msg }) => {
  return (
    <div className="contact-info-container">
      <form>
      <div className="info">
        <FaAt/>
        <input type="email" 
        placeholder="Insira seu e-mail" 
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}/>
      </div>
      <div className="info">
        <FaPhone/>
        <input type="text" placeholder="Insira seu celular"
        value={formData.phone}
        onChange={(e) => setFormData({...formData, phone: e.target.value})}/>
      </div>
      </form>
    </div>
  )
}

export default ContactInfo