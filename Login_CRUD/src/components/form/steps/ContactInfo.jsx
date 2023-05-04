import React from 'react'

const ContactInfo = () => {
  return (
    <div className="personal-info-container">
      <form>
      <input type="email" placeholder="Insira seu email" />
      <input type="text" placeholder="Insira seu celular"/>
      </form>
    </div>
  )
}

export default ContactInfo