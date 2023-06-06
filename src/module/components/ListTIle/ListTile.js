import './ListTile.css';
import { BiCaretRight ,BiTrash,BiPencil} from "react-icons/bi";

function ListTile({ title, subtitle ,open,trailing,leading}) {
  return (
    <div className='mainList'>
    <div className='background'>
   
      <h3>{title}</h3>
     {open && open===true && <span>
        <BiCaretRight />
      </span>}
      <section className='icon-traling'>
      {trailing && trailing===true && <span>
        <BiPencil size={25} />
      </span>}
      {leading && leading===true && <span>
        <BiTrash size={25} />
      </span>}
      </section>
    </div>
       {subtitle && subtitle.trim() !== "" && <p>Autor: {subtitle}</p>}
       
       </div>
  );
}

export default ListTile;
