import { useState } from "react";
import ButtonPrimary from "../../components/button/Button";

function Responder() {
  const [contador, setContador] = useState(0);
  const [respostas, setRespostas] = useState({});

  const [testes, setTestes] = useState([
    {
      pergunta: "awd",
      opcaoA: "awda",
      opcaoB: "wd",
      opcaoC: "awd",
      opcaoD: "awdaawdwads",
      opcaoE: "awd",
      respostaCerta: "A",
    },
    {
      pergunta: "aadwawdwd",
      opcaoA: "awda",
      opcaoB: "wd",
      opcaoC: "awd",
      opcaoD: "awd",
      opcaoE: "awd",
      respostaCerta: "A",
    },
  ]);

  const Contar = (event) => {
    event.preventDefault();

    const respostaSelecionada = document.querySelector('input[name="opcao"]:checked').value;

    setRespostas((prevRespostas) => ({
      ...prevRespostas,
      [contador]: respostaSelecionada,
    }));

    setContador((prevContador) => prevContador + 1);
  };

  const Finalizar = (event) => {
    event.preventDefault();

    console.log(respostas);
  };

  return (
    <div>
      <div>
        <div key={contador}>
          <h2>{testes[contador].pergunta}</h2>
          <input type="radio" name="opcao" value="A" /> {testes[contador].opcaoA}
          <input type="radio" name="opcao" value="B" /> {testes[contador].opcaoB}
          <input type="radio" name="opcao" value="C" /> {testes[contador].opcaoC}
          <input type="radio" name="opcao" value="D" /> {testes[contador].opcaoD}
          <input type="radio" name="opcao" value="E" /> {testes[contador].opcaoE}
        </div>
      </div>
      {testes.length === contador+1 ? (
        <div></div>
      ) : (
        <ButtonPrimary text={"Próxima"} event={Contar} />
      )}
      <ButtonPrimary text={"Finalizar"} event={Finalizar} />
    </div>
  );
}

export default Responder;
