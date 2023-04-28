import {React, useState} from 'react'
import Button from './Button'

const RegisterForm = () => {

    const [page, setPage] = useState(0)

  return (
    <div className="form">
        <div className="progressbar"></div>
        <div className="form-container">
            <div className="header"></div>
            <div className="body"></div>
            <div className="footer"></div>
            <Button txt='Voltar'/>
            <Button txt='Avançar'/>
        </div>
    </div>
  )
}

export default RegisterForm