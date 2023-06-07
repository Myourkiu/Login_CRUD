import "../../styles/components/user.sass";

import { FaRegUser, FaAt, FaPhone } from "react-icons/fa";
import { AiOutlineArrowLeft } from "react-icons/ai";

import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import MaskedInput from "../form/MaskedInput";

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
  const [msg, setMsg] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [verify, setVerify] = useState({
    firstName: true,
    lastName: true,
    email: true,
    phone: true,
  });

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
        setUser(data);
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

    if (!regEx.test(user.email) || user.email == "") {
      setMsg({ ...msg, email: "Insira um email válido!" });
      setVerify({ ...verify, email: false });
    } else {
      setMsg({ ...msg, email: "" });
      setVerify({ ...verify, email: true });
    }
  }

  function phoneValidate(e) {
    setUser({ ...user, phone: e.target.value });

    if (user.phone.length < 10 || user.phone == "") {
      setMsg({ ...msg, phone: "Insira um número de telefone válido!" });
      setVerify({ ...verify, phone: false });
    } else {
      setMsg({ ...msg, phone: "" });
      setVerify({ ...verify, phone: true });
    }
  }

  function validateEdit(e) {
    e.preventDefault();

    if (
      verify.firstName === true && 
      verify.lastName === true && 
      verify.email === true && 
      verify.phone === true
    ){
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
          <p>{msg.firstName}</p>
          <div className="info">
            <FaRegUser />
            <input
              type="text"
              placeholder="Sobrenome"
              value={user.lastName}
              onChange={lastNameValidate}
            />
          </div>
          <p>{msg.lastName}</p>
          <div className="info">
            <FaAt />
            <input
              type="email"
              placeholder="Email"
              value={user.email}
              onChange={emailValidate}
            />
          </div>
          <p>{msg.email}</p>
          <div className="info">
            <FaPhone />
            <MaskedInput
              placeholder="Celular"
              value={user.phone}
              onChange={phoneValidate}
            />
          </div>
          <p>{msg.phone}</p>

          <button onClick={validateEdit}>Concluir edição</button>
        </form>
      </div>
    </div>
  );
};

export default User;
