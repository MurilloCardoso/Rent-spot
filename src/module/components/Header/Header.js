import "./HeaderStyle.css";
import ButtonPrimary from "../button/Button";
import img from "../../data/img/logo512.png";
import { BiHelpCircle } from "react-icons/bi";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <nav className="nav">
      <Link to="/">
        <img src={img} className="logo"></img>
        </Link>
        <div className="buttons-container">
          <BiHelpCircle id="icon" />
          <Link to="/sessao">
            <ButtonPrimary
              className="button"
              text={"Registrar"}
            ></ButtonPrimary>
          </Link>
          <Link to="/sessao">
            <ButtonPrimary
              className="button"
              text={"Iniciar Sessão"}
            ></ButtonPrimary>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
