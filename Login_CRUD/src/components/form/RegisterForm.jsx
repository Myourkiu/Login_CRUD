import {React, useState} from 'react'

import PersonalInfo from './steps/PersonalInfo.jsx'
import ContactInfo from './steps/ContactInfo.jsx'
import PassCreate from './steps/PassCreate.jsx'

import '../../styles/components/registerform.sass'

const RegisterForm = () => {

    const [page, setPage] = useState(0)

    const FormTitles = ['Dados Pessoais', 'Contato', 'Senha']

    function PageDisplay() {
      if(page === 0){
        return <PersonalInfo/>
      }
      else if(page === 1){
        return <ContactInfo/>
      }
      else if(page === 2){
        return <PassCreate/>
      }
    }

  return (
    <div className="form">
        <div className="progressbar"></div>
        <div className="form-container">
            <div className="header">
              <h1>{FormTitles[page]}</h1>
            </div>
            <div className="body">
              {PageDisplay()}
            </div>
            <div className="footer">
              <div className="btns">
              <button 
              disabled={page == 0}
              onClick={() => {setPage((currPage)  => currPage - 1)}}
              className='btn'>Voltar</button>

              {page < 2 && (<button
              disabled={page == FormTitles.length - 1} 
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