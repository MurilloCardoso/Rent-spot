import React, { useState } from "react";
import "./sessao.css";
import LoginSessao from "../login/Login";
import CadastroSessao from "../cadastro/Cadastro";

function Sessao() {
  const [isLoginForm, setIsLoginForm] = useState(true);

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica para lidar com o envio do formulário
  };

  return (
    <div className="main">
      <div className="form-container">
        <p className="title">{isLoginForm ? "Login" : "Cadastro"}</p>
        <form className="form" onSubmit={handleSubmit}>
          {isLoginForm ? <LoginSessao /> : <CadastroSessao />}
          <button className="sign" type="submit">
            {isLoginForm ? "Sign in" : "Sign up"}
          </button>
        </form>

        <p className="signup">
          {isLoginForm ? "Don't have an account?" : "Already have an account?"}
          <a href="#" onClick={toggleForm}>
            {isLoginForm ? "Sign up" : "Sign in"}
          </a>
        </p>
      </div>
    </div>
  );
}

export default Sessao;
