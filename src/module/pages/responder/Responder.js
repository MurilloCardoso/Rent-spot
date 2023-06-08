import React, { useState, useEffect } from "react";
import ButtonPrimary from "../../components/button/Button";
import { useParams, useNavigate } from "react-router-dom";
import Api from "../../utils/Api";
import Loading from "../../components/loading/Loading";

function Responder() {
  let navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem("token") == null &&  localStorage.getItem("username")==null) {
      navigate("/sessao")
  }
  
  });
  const { id } = useParams();
  const [contador, setContador] = useState(0);
  const [respostas, setRespostas] = useState({});
  const [exibirFinalizar, setExibirFinalizar] = useState(false);
  const [testes, setTestes] = useState(null); // Alterado para null inicialmente

  useEffect(() => {
    const fetchTestes = async () => {
      try {
        const resultado = await Api.LerTesteID(id);
        setTestes(resultado);
        console.log(resultado);
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

      if (contador + 1 === testes.perguntas.length) {
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
    testes.perguntas.forEach((pergunta, index) => {
      console.log(pergunta.respostaCerta);
      if (pergunta.respostaCerta === respostas[index]) {
        acertos++;
      }
    });
    console.log("Acertos " + acertos);
    const jsonData = {
      nomeTeste: testes.nomeTeste,
      autor: testes.autor,
      quantidadeAcertos: acertos,
    };
    Api.InsertRespostaApi(jsonData)
      .then(() => {
        window.alert("Respondidade com sucesso")
      })
      .catch((error) => {
        console.error("Erro ao inserir os dados:", error);
      });
  };

  return (
    <div style={{ textAlign: "center" }}>
      {testes === null ? (
        <Loading />
      ) : (
        <>
          {contador < testes.perguntas.length ? (
            <div>
              <div key={contador}>
                <h2>{testes.perguntas[contador].pergunta}</h2>
                <input type="radio" name="opcao" value="A" />{" "}
                {testes.perguntas[contador].opcaoA}
                <input type="radio" name="opcao" value="B" />{" "}
                {testes.perguntas[contador].opcaoB}
                <input type="radio" name="opcao" value="C" />{" "}
                {testes.perguntas[contador].opcaoC}
                <input type="radio" name="opcao" value="D" />{" "}
                {testes.perguntas[contador].opcaoD}
                <input type="radio" name="opcao" value="E" />{" "}
                {testes.perguntas[contador].opcaoE}
              </div>
              <ButtonPrimary text={"Próxima"} event={Contar} />
            </div>
          ) : (
            <div>
              <h3>Respostas selecionadas:</h3>
              {testes.perguntas.map((pergunta, index) => (
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
        </>
      )}
    </div>
  );
}

export default Responder;
