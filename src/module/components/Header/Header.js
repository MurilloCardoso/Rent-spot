
import './HeaderStyle.css';
import ButtonPrimary from '../button/Button';
import img from "../../data/img/logo512.png";
import { BiHelpCircle} from "react-icons/bi";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <nav className="nav">
        <img src={img} className='logo'></img>
 
        <div className="buttons-container">    
        <BiHelpCircle id='icon'/>
        <Link to="/cadastro">
          <ButtonPrimary className="button" text={"Registrar"}></ButtonPrimary> 
        </Link>  
         <Link to="/login">
            <ButtonPrimary className="button" text={"Iniciar Sessão"}></ButtonPrimary>
         </Link> 
         </div>  
      </nav>
    </header>
  );
}

export default Header;
