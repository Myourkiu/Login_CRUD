import {React, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'

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

    const navigate = useNavigate()

    function PageDisplay() {
      if(page === 0){
        return <PersonalInfo 
        formData={formData} 
        setFormData={setFormData}
        />
      }

      else if(page === 1){
        return <ContactInfo 
        formData={formData} 
        setFormData={setFormData}/>
      }
      else if(page === 2){
        return <PassCreate 
        formData={formData} 
        setFormData={setFormData}/>
      }
    }

    const ValidatePersonalInfo = () => {
      if(2 < formData.firstName.length && formData.lastName.length > 2){
        setPage((currPage) => currPage + 1)}
      else{
        return} 
    }

    function emailValidate() {
      const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g

      if(!regEx.test(formData.email)){
        return false
      }else return true
    }

    const ValidateContactInfo = () => { 
      emailValidate()
      if(formData.phone.length == 11 && emailValidate(true)){
        setPage((currPage) => currPage + 1)
      }else return
    }
  

    const ValidatePassCreate = () => {
      if(formData.password > 7 &&  formData.password === formData.confirmPassword){
        createUser(formData)
      }else return 
    }

    function createUser(user) {
      fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(user),
      })
      .then((resp) => resp.json())
      .then((data) => {
        navigate(`/`)
      })
      .catch((err) => console.log(err))
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
                  Já possui uma conta? Entre</Link>
              </div>
            </div>
            <div className="footer">
              <div className="btns">
              <button 
              disabled={page == 0}
              onClick={() => {setPage((currPage) => currPage - 1)}}
              className='btn'>Voltar</button>

              {page == 0 && (<button onClick={ValidatePersonalInfo}>Avançar</button>)}
              {page == 1 && (<button onClick={ValidateContactInfo}>Avançar</button>)}
              {page == 2 && (<button onClick={ValidatePassCreate}>Concluir</button>)}
              </div>
            </div>
        </div>
    </div>
  )
}

export default RegisterForm