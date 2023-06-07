import React, { useState, useEffect } from "react";
import ButtonPrimary from "../../components/button/Button";
import { useParams } from "react-router-dom";
import Api from "../../utils/Api";

function Responder() {
  const { id } = useParams();
  const [contador, setContador] = useState(0);
  const [respostas, setRespostas] = useState({});
  const [exibirFinalizar, setExibirFinalizar] = useState(false);
  const [testes, setTestes] = useState([]);

  useEffect(() => {
    const fetchTestes = async () => {
      try {
        const resultados = await Api.LerTesteCriados();
        setTestes(resultados);
        console.log(resultados)
      } catch (error) {
        console.error("Erro ao obter os resultados:", error);
      }
    };

    fetchTestes();
  }, []);

  const Contar = (event) => {
    event.preventDefault();

    const respostaSelecionada = document.querySelector(
      'input[name="opcao"]:checked'
    );

    if (respostaSelecionada) {
      setRespostas((prevRespostas) => ({
        ...prevRespostas,
        [contador]: respostaSelecionada.value,
      }));

      if (contador + 1 === testes[parseInt(id)].perguntas.length) {
        setExibirFinalizar(true);
      }

      setContador((prevContador) => prevContador + 1);
    } else {
      alert("Selecione uma opção");
    }
  };

  const Finalizar = (event) => {
    event.preventDefault();
    var acertos = 0;
    testes[parseInt(id)].perguntas.forEach((pergunta, index) => {
      
 
      if (pergunta.respostaCerta === respostas[index]) {
        acertos++;
      }
    });console.log("Acertos "+acertos)
    const jsonData = {
      nomeTeste: testes[parseInt(id)].nomeTeste,
      autor: testes[parseInt(id)].autor,
      quantidadeAcertos: acertos,
    };
    Api.InsertRespostaApi(jsonData);
  };

  return (
    <div>
    {contador < testes[parseInt(id)]?.perguntas?.length ? (
      <div>
        <div key={contador}>
          <h2>{testes[parseInt(id)]?.perguntas?.[contador]?.pergunta}</h2>
          <input type="radio" name="opcao" value="A" />{" "}
          {testes[parseInt(id)]?.perguntas?.[contador]?.opcaoA}
          <input type="radio" name="opcao" value="B" />{" "}
          {testes[parseInt(id)]?.perguntas?.[contador]?.opcaoB}
          <input type="radio" name="opcao" value="C" />{" "}
          {testes[parseInt(id)]?.perguntas?.[contador]?.opcaoC}
          <input type="radio" name="opcao" value="D" />{" "}
          {testes[parseInt(id)]?.perguntas?.[contador]?.opcaoD}
          <input type="radio" name="opcao" value="E" />{" "}
          {testes[parseInt(id)]?.perguntas?.[contador]?.opcaoE}
        </div>
        <ButtonPrimary text={"Próxima"} event={Contar} />
      </div>
    ) : (
      <div>
        <h3>Respostas selecionadas:</h3>
        {testes[parseInt(id)]?.perguntas?.map((pergunta, index) => (
          <div key={index}>
            <p>
              Pergunta {index + 1}: Resposta selecionada -{" "}
              {respostas[index] ? respostas[index] : "Nenhuma resposta"}
            </p>
          </div>
        ))}
        <ButtonPrimary text={"Finalizar"} event={Finalizar} />
      </div>
    )}
  </div>
  );
}

export default Responder;
