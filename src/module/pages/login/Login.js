import "./login.css";
import {useState} from "react";

function Login({ onValueUsernameChange, onValuePasswordChange }) {
  const handleUsernameChange = (event) => {
 
     onValueUsernameChange(event.target.value)
  };

  const handlePasswordChange = (event) => {

    onValuePasswordChange(event.target.value);
  };
  return (
    <div>
      <form class="form">
        <div class="input-group">
          <label for="username">Usuário</label>
          <input type="text" name="username" id="username" placeholder="Insira seu usuário"  
            onChange={handleUsernameChange}/>
        </div>
        <div class="input-group">
          <label for="password">Senha</label>
          <input type="password" 
            onChange={handlePasswordChange} name="password" id="password" placeholder="Insira sua senha" />
          <div class="forgot">
            <a rel="noopener noreferrer" href="#">
              Esqueceu a senha?
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
