
import './HeaderStyle.css';
import ButtonPrimary from '../button/Button';
import { BiHelpCircle} from "react-icons/bi";
function Header() {
  return (
    <header className="header">
      <nav className="nav">
        <h2 className='logo'>Rent Spot</h2>
 
        <div className="buttons-container">    <BiHelpCircle id='icon'/>
        <ButtonPrimary className="button" text={"Registrar"}></ButtonPrimary>
        <ButtonPrimary className="button" text={"Iniciar Sessão"}></ButtonPrimary></div>
      </nav>
    </header>
  );
}

export default Header;
