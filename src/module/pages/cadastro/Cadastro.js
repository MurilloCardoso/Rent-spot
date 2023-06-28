
import {useState,} from "react";
import "./cadastro.css";
function Cadastro({ onValueUsernameChange, onValuePasswordChange,onValueEmailChange,onValueConfirmPasswordChange }) {

  const handleUsernameChange = (event) => {
     onValueUsernameChange(event.target.value)
  };

  const handlePasswordChange = (event) => {
    onValuePasswordChange(event.target.value);
  };
  const handleEmailChange = (event) => {
     onValueEmailChange(event.target.value)
  };

  const handleConfirmPasswordChange = (event) => {
    onValueConfirmPasswordChange(event.target.value);

  };
  return (
    <div>
      <form class="form">
        <div class="input-group">
          <label for="username">Usuário</label>
          <input type="text" name="username"  
            onChange={handleUsernameChange} id="username" placeholder="Insira o nome de usuário" />
        </div>
        <div class="input-group">
          <label for="password">E-mail</label>
          <input type="e-mail" name="email" 
            onChange={handleEmailChange}  id="password" placeholder="Insira o e-mail" />
        </div>
        <div class="input-group">
          <label for="password">Senha</label>
          <input type="password" name="password" 
            onChange={handlePasswordChange} id="password" placeholder="Insira a senha" />
        </div>
        <div class="input-group">
          <label for="password">Confirmação de Senha</label>
          <input type="password" name="password"
            onChange={handleConfirmPasswordChange}   id="password" placeholder="Insira a senha novamente" />
        </div>
      </form>
    </div>
  );
}

export default Cadastro;
