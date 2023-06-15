import "../../styles/components/user.sass";

import { FaRegUser, FaAt, FaPhone, FaLock } from "react-icons/fa";
import { AiOutlineArrowLeft } from "react-icons/ai";

import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import bcrypt from 'bcryptjs'

import MaskedInput from "../form/MaskedInput";
import Modal from "../Modal";

const User = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    id: "",
  });

  const [compareUser, setCompareUser] = useState({});

  const [msg, setMsg] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [verify, setVerify] = useState({
    firstName: true,
    lastName: true,
    email: true,
    phone: true,
    password: false
  });

  const [openModal, setOpenModal] = useState(false);

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

  useEffect(() => {
    fetch(`http://localhost:5000/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setCompareUser(data);
      })
      .catch((err) => console.log(err));
  }, []);

  function editPost(user) {
    fetch(`http://localhost:5000/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setUser({ data });
        navigate(`/info/${user.id}`, { state: user });
      })
      .catch((err) => console.log(err));
  }

  function firstNameValidate(e) {
    const regExResult = e.target.value.replace(/[^a-z]/gi, "");

    setUser({ ...user, firstName: regExResult });
    if (!(e.target.value.length > 2)) {
      setMsg({
        ...msg,
        firstName: "O nome precisa ter no mínimo 3 caracteres",
      });
      setVerify({ ...verify, firstName: false });
    } else {
      setMsg({ ...msg, firstName: "" });
      setVerify({ ...verify, firstName: true });
    }
  }

  function lastNameValidate(e) {
    const regExResult = e.target.value.replace(/[^a-z]/gi, "");

    setUser({ ...user, lastName: regExResult });
    if (!(e.target.value.length > 2)) {
      setMsg({
        ...msg,
        lastName: "O sobrenome precisa ter no mínimo 3 caracteres",
      });
      setVerify({ ...verify, lastName: false });
    } else {
      setMsg({ ...msg, lastName: "" });
      setVerify({ ...verify, lastName: true });
    }
  }

  function emailValidate(e) {
    const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;

    setUser({ ...user, email: e.target.value });

    const emailExists = compareUser.find(
      (user) => user.email == e.target.value
    );

    if (!regEx.test(user.email) || e.target.value == "") {
      setMsg({ ...msg, email: "Insira um email válido!" });
      setVerify({ ...verify, email: false });
    } else if (emailExists && emailExists.id !== user.id) {
      setMsg({ ...msg, email: "Este email já existe!" });
      setVerify({ ...verify, email: false });
    } else {
      setMsg({ ...msg, email: "" });
      setVerify({ ...verify, email: true });
    }
  }
  function phoneValidate(e) {
    setUser({ ...user, phone: e.target.value });
    const phoneExists = compareUser.find(
      (user) => user.phone == e.target.value
    );

    if (user.phone.length < 10 || user.phone == "") {
      setMsg({ ...msg, phone: "Insira um número de telefone válido!" });
      setVerify({ ...verify, phone: false });
    } else if (phoneExists && phoneExists.id !== user.id) {
      setMsg({ ...msg, phone: "Este número de telefone já existe!" });
      setVerify({ ...verify, phone: false });
    } else {
      setMsg({ ...msg, phone: "" });
      setVerify({ ...verify, phone: true });
    }
  }

  function passwordValidate(e) {
    bcrypt.compare(e.target.value, user.password, function(err, isMatch){
      if(err){
        console.log(err)
      }else if(!isMatch){
        setMsg({...msg, password: 'Senha incorreta!'})
      }else{
        setMsg({...msg, password: ''})
        setVerify({...verify, password: true})
      }
    })
  }

  function passwordButtonValidate(e) {
    e.preventDefault()
    if(verify.password == false){
      return
    }else{
      setMsg({...msg, password: ''})
      navigate(`/user/${user.id}/edit/password`)
    }
  }

  function validateEdit(e) {
    e.preventDefault();
    if (
      verify.firstName === true &&
      verify.lastName === true &&
      verify.email === true &&
      verify.phone === true
    ) {
      editPost(user);
    }
  }

  return (
    <div className="container">
      <nav className="navbar">
        <Link to={`/info/${user.id}`} state={user}>
          <AiOutlineArrowLeft />
        </Link>
      </nav>
      <div className="form-container">
        <form className="form">
          <div className="info">
            <FaRegUser />
            <input
              type="text"
              placeholder="Nome"
              value={user.firstName}
              onChange={firstNameValidate}
            />
          </div>
          <div className="error-msg">
            <p>{msg.firstName}</p>
          </div>
          <div className="info">
            <FaRegUser />
            <input
              type="text"
              placeholder="Sobrenome"
              value={user.lastName}
              onChange={lastNameValidate}
            />
          </div>
          <div className="error-msg">
            <p>{msg.lastName}</p>
          </div>
          <div className="info">
            <FaAt />
            <input
              type="email"
              placeholder="Email"
              value={user.email}
              onPaste={(e) => {
                e.preventDefault();
                return false;
              }}
              onChange={emailValidate}
            />
          </div>
          <div className="error-msg">
            <p>{msg.email}</p>
          </div>
          <div className="info">
            <FaPhone />
            <MaskedInput
              placeholder="Celular"
              value={user.phone}
              onChange={phoneValidate}
            />
          </div>
          <div className="error-msg">
            <p>{msg.phone}</p>
          </div>

          <a
            onClick={(e) => {
              e.preventDefault();
              setOpenModal(true);
            }}
          >
            Alterar senha?
          </a>

          <button onClick={validateEdit}>Concluir edição</button>
        </form>
        <Modal isOpen={openModal}>
          <p className="password-title">Digite sua senha atual:</p>
          <div className="info-container">
            <form className="modal-form">
              <div className="info">
                <FaLock />
                <input 
                type="password" 
                placeholder="Insira sua senha atual" 
                onChange={passwordValidate}/>
              </div>
              <p className="error-msg">{msg.password}</p>

              <div className="btn-area">
                <button
                  className="btn-back"
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenModal(!openModal);
                  }}
                >
                  Voltar
                </button>
                <button 
                className="btn-password" onClick={passwordButtonValidate}>
                  Concluir
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default User;