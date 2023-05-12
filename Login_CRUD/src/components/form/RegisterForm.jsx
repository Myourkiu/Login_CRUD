import {React, useState} from 'react'
import { Link } from 'react-router-dom'

import PersonalInfo from './steps/PersonalInfo.jsx'
import ContactInfo from './steps/ContactInfo.jsx'
import PassCreate from './steps/PassCreate.jsx'

import '../../styles/components/registerform.sass'

const RegisterForm = () => {

    const [page, setPage] = useState(0)
    const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: ""
    })

    const FormTitles = ['Dados Pessoais', 'Contato', 'Senha']

    function PageDisplay() {
      if(page === 0){
        return <PersonalInfo formData={formData} setFormData={setFormData}/>
      }
      else if(page === 1){
        return <ContactInfo formData={formData} setFormData={setFormData}/>
      }
      else if(page === 2){
        return <PassCreate formData={formData} setFormData={setFormData}/>
      }
    }

  return (
    <div className="form">
        <div className="progressbar">
          <div style={{width: page === 0 ? '3%' : page === 1 ? '50%' : '100%'}}></div>
        </div>
        <div className="form-container">
            <div className="header">
              <h1>{FormTitles[page]}</h1>
            </div>
            <div className="body">
              {PageDisplay()}
              <div className="have-account">
                <Link to='/'>
                  <a>Já possui uma conta? Entre</a></Link>
              </div>
            </div>
            <div className="footer">
              <div className="btns">
              <button 
              disabled={page == 0}
              onClick={() => {setPage((currPage)  => currPage - 1)}}
              className='btn'>Voltar</button>

              

              {page < 2 && (<button
              onClick={() => {setPage((currPage) => currPage + 1)}}>Avançar</button>)}

              {page === 2 && (
                <button>Concluir</button>
              )}
              </div>
            </div>
        </div>
    </div>
  )
}

export default RegisterForm