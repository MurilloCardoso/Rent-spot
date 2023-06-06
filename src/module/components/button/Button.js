import "./ButtonsStyle.css";

function ButtonPrimary(props) {
  return (
    <button className="button" onClick={props.event}>
      {props.text}
    </button>
  );
}

export default ButtonPrimary;
