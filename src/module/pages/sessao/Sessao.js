import React, { useState,useEffect } from "react";
import "./sessao.css";
import LoginSessao from "../login/Login";
import CadastroSessao from "../cadastro/Cadastro";
import Api from  "../../utils/Api";
function Sessao() {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [inputValueUsername, setInputUsernameValue] = useState("");
  const [inputValuePassword, setInputPasswordValue] = useState("");
  const [inputValueEmail, setInputEmailValue] = useState("");
  const [inputValueConfirmPassword, setInputConfirmPasswordValue] = useState("");
  useEffect(() => {
    console.log(inputValueUsername);
  }, [inputValueUsername]);

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
  };
  const handleUsernameChange = (newValue) => {
    setInputUsernameValue(newValue);

  };
  const handlePasswordChange = (newValue) => {
    setInputPasswordValue(newValue);
  };
  
  const handleEmailChange = (newValue) => {
    setInputEmailValue(newValue);

  };
  const handleConfirmPasswordChange = (newValue) => {
    setInputConfirmPasswordValue(newValue);

  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic to handle form submission
    console.log("Username:", inputValueUsername);
    console.log("Password:", inputValuePassword);
  };
  const submit = () => {
    if(isLoginForm){   
     
      const jsonData= {"name":inputValueUsername,"password":inputValuePassword}
      Api.LoginUserApi(jsonData);
    }else{
      if(inputValueConfirmPassword === inputValuePassword){console.log("Cadastro")
        const jsonData= {"name":inputValueUsername,"email":inputValueEmail,"password":inputValueConfirmPassword}
       Api.InsertUserApi(jsonData);
      }
     
    }
  };

  
  return (
    <div className="main">
      <div className="form-container">
        <p className="title">{isLoginForm ? "Login" : "Cadastro"}</p>
        <form className="form" onSubmit={handleSubmit} >
          {isLoginForm ?  <LoginSessao
              onValueUsernameChange={handleUsernameChange}
              onValuePasswordChange={handlePasswordChange}
            /> : <CadastroSessao 
              onValueUsernameChange={handleUsernameChange}
              onValuePasswordChange={handlePasswordChange}
              onValueEmailChange={handleEmailChange}
              onValueConfirmPasswordChange={handleConfirmPasswordChange}
            />}
          <button className="sign" type="submit" onClick={submit}>
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
