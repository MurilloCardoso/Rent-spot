import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BiHelpCircle } from "react-icons/bi";
import ButtonPrimary from "../button/Button";
import img from "../../data/img/logo512.png";
import "./HeaderStyle.css";
function Header() {
  const [user, setUser] = useState();
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    if (token) {
      setUser(username);
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, []);

  return (
    <header className="header">
      <nav className="nav">
        <Link to="/">
          
          <img src={img} className="logo" alt="Logo" />
        </Link>
        {isLogged ? (
          <div className="buttons-container"> <h3>Olá, {user}</h3></div>
        ) : (
          <div className="buttons-container">
            <BiHelpCircle id="icon" />
            <Link to="/sessao">
              <ButtonPrimary className="button" text={"Registrar"} />
            </Link>
            <Link to="/sessao">
              <ButtonPrimary className="button" text={"Iniciar Sessão"} />
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
