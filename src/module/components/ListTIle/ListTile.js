import "./ListTile.css";
import { BiCaretRight, BiTrash, BiPencil } from "react-icons/bi";
import { Link } from "react-router-dom";

function ListTile({ title, subtitle, open, trailing, leading, arg, url, event,eventEdit }) {
  return (
    <div className="mainList">
      <div className="background">
      {url && url !== "" ? (
        <Link to={url} >
        <h3>{title}</h3>
          </Link>
        ) : (
          title && title !== "" && <h3>{title}</h3>
        )}


        {arg && arg !== "" && <h3>ACERTOS: {arg}</h3>}
        {open && open === true && (
          <span>
            <BiCaretRight />
          </span>
        )}
        <section className="icon-traling">
          {trailing && trailing === true && (
            <span onClick={eventEdit}>
              <BiPencil size={25} />
            </span>
          )}
          {leading && leading === true && (
           <span onClick={event}>
              <BiTrash size={25} />
            </span>
          )}
        
        </section>
      </div>
      {subtitle && subtitle.trim() !== "" && <p>Autor: {subtitle}</p>}
    </div>
  );
}

export default ListTile;
