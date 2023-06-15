import "../../styles/components/passedit.sass";

import { FaLock } from "react-icons/fa";
import { AiOutlineArrowLeft } from "react-icons/ai";

import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import bcrypt from 'bcryptjs'

const PassEdit = () => {
  const { id } = useParams();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    id: "",
  })
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: ""
  })
  const [msg, setMsg] = useState({
    password: "",
    confirmPassword: ""
  })

  const [verify, setVerify] = useState({
    password: false,
    confirmPassword: false
  })

  const navigate = useNavigate()

  useEffect(() => {
    fetch(`http://localhost:5000/users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setUser(data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  function editPassword(user) {
    fetch(`http://localhost:5000/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setUser( data );
        navigate(`/user/${user.id}/edit`, { state: user });
      })
      .catch((err) => console.log(err));
  }
  const passwordValidate = (e) => {
    if(e.target.value.length < 8){
      setMsg({...msg, password: 'A senha precisa ter no mínimo 8 caracteres.'})
      setVerify({...verify, password: false})
    }else{
      setMsg({...msg, password: ''})
      setVerify({...verify, password: true})
    }
    setFormData({...formData, password: e.target.value})
  }

  const confirmPasswordValidate = (e) => {
    if(e.target.value !== formData.password){
      setMsg({...msg, confirmPassword: 'As senhas precisam ser compatíveis.'})
      setVerify({...verify, confirmPassword: false})
    }else{
      setMsg({...msg, confirmPassword: ''})
      setVerify({...verify, confirmPassword: true})
    }
    setFormData({...formData, confirmPassword: e.target.value})
  }

  const allVerify = (e) => {
    e.preventDefault()

    if(formData.confirmPassword == '' || formData.password == ''){
      setMsg({...msg, confirmPassword: 'Preencha o(s) campo(s) em branco!'})
    }else setMsg({...msg, confirmPassword: ''})

    if(verify.password === true && verify.confirmPassword == true){

      const hashedPassword = bcrypt.hashSync(formData.password, 10)

      editPassword({
        firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          password: hashedPassword,
          id: user.id
      })

    }else return
  }
  
  return (
    <div className="container">
      <nav className="navbar">
        <Link to={`/info/${id}`}>
          <AiOutlineArrowLeft />
        </Link>
      </nav>

      <div className="form-container">
        <form>
          <h1>Edição de senha</h1>
            <div className="info">
              <FaLock />
              <input
                type="password"
                placeholder="Insira sua nova senha"
                value={formData.password}
                onChange={passwordValidate}
              />
            </div>

            <div className="error-msg">
                <p>{msg.password}</p>
              </div>

            <div className="info">
              <FaLock />
              <input
                type="password"
                placeholder="Confirme a senha"
                value={formData.confirmPassword}
                onChange={confirmPasswordValidate}
              />
              </div>
              <div className="error-msg">
                <p>{msg.confirmPassword}</p>
              </div>

            <div className="btn-area">
              <button onClick={(e)=> {
                e.preventDefault()
                navigate(`/user/${user.id}/edit`, { state: user })
              }}>Voltar</button>
              <button onClick={allVerify}>Concluir</button>
              
            </div>
          </form>
      </div>
    </div>
  )
}

export default PassEdit