import "./EditarTeste.css";
import ButtonPrimary from "../../components/button/Button";
import InputTeste from "../../components/inputs/InputPerguntas/input";
import React, { useState, useEffect } from "react";
import Dropdown from "../../components/Dropdown/Dropdown";
import Api from "../../utils/Api";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../../components/loading/Loading";

function EditarTeste() {
  const { id } = useParams();
  const navigate = useNavigate();
const [testes, setTestes] = useState();
const [isLoading,setisLoading] =useState(false);
  const [inputValues, setInputValues] = useState({
    Teste: "",
    Pergunta:"",
    A: "",
    B: "",
    C: "",
    D: "",
    E: "",
  });
  const [dropdowns, setDropdowns] = useState([]);

  useEffect(() => {
    const fetchTestes = async () => {
      try {
        const resultado = await Api.LerTesteID(id);
        setTestes(resultado);
        setisLoading(true);
      } catch (error) {
        console.error("Erro ao obter os resultados:", error);
      }
    };
  
    fetchTestes();
  }, [id]);

  const handleOptionSelected = (index, value) => {
    const updatedDropdowns = [...dropdowns];
    updatedDropdowns[index] = value;
    setDropdowns(updatedDropdowns);
  };

  const handleInputChange = (name, value) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  

  function handleFinalizar() {
 
    const perguntasArray = [];

    const inputs = document.querySelectorAll(".form-perguntas input");

    inputs.forEach((input, index) => {
      const perguntaIndex = Math.floor(index / 6);
      const inputIndex = index % 6;
      const inputValue = input.value;

      if (!perguntasArray[perguntaIndex]) {
        perguntasArray[perguntaIndex] = {};
      }

      switch (inputIndex) {
        case 0:
          perguntasArray[perguntaIndex].pergunta = inputValue;
          break;
        case 1:
          perguntasArray[perguntaIndex].opcaoA = inputValue;
          break;
        case 2:
          perguntasArray[perguntaIndex].opcaoB = inputValue;
          break;
        case 3:
          perguntasArray[perguntaIndex].opcaoC = inputValue;
          break;
        case 4:
          perguntasArray[perguntaIndex].opcaoD = inputValue;
          break;
        case 5:
          perguntasArray[perguntaIndex].opcaoE = inputValue;
          break;
        default:
          break;
      }
    });

    const testeNome = inputValues.Teste;

    const finalData = perguntasArray.map((pergunta, index) => {
      return {
        ...pergunta,
        respostaCerta: dropdowns[index],
      };
    });

    const jsonData = {
      nomeTeste: testeNome,
      autor: "Murillo",
      perguntas: finalData,
    };    console.log(jsonData);  


     Api.UpdateTesteApi(id,jsonData)
     .then(() => {
       navigate("/");
     })
     .catch((error) => {
       console.error("Erro ao inserir os dados:", error);
     });
  }
 
  useEffect(() => {
    if (testes) {handleInputChange("Teste", testes.nomeTeste);
      testes.perguntas.forEach((pergunta, perguntaIndex) => {
        handleOptionSelected(perguntaIndex, pergunta.respostaCerta);
      });
 
    }
  }, [testes]);
  return (
    <div style={{ textAlign: "center" }}>
      {isLoading ? (
        <div>
          <section>
            <label>Nome Teste:</label>
            <InputTeste
              className="Teste"
              onValueChange={(newValue) => handleInputChange("Teste", newValue)}
              value={testes.nomeTeste}
            />
  
            {testes.perguntas.map((pergunta, perguntaIndex) => (
              <div key={perguntaIndex} className="form-perguntas">
                <label>Pergunta</label>
                <InputTeste
                  className="Pergunta"
                  id="input"
                  onValueChange={(newValue) =>
                    handleInputChange("Pergunta", newValue)
                  }
                  value={pergunta.pergunta}
                />
                <div id="itens-perguntas-group">
                  <label>A</label>
                  <InputTeste
                    className="A"
                    id="input"
                    onValueChange={(newValue) =>
                      handleInputChange("A", newValue)
                    }
                    value={pergunta.opcaoA}
                  />
                </div>
                <div id="itens-perguntas-group">
                  <label>B</label>
                  <InputTeste
                    className="B"
                    id="input"onValueChange={(newValue) =>
                      handleInputChange("B", newValue)
                    }
                    value={pergunta.opcaoB}
                  />
                </div>
                <div id="itens-perguntas-group">
                  <label>C</label>
                  <InputTeste
                    className="C"
                    id="input"onValueChange={(newValue) =>
                      handleInputChange("C", newValue)
                    }
                    value={pergunta.opcaoC}
                  />
                </div>
                <div id="itens-perguntas-group">
                  <label>D</label>
                  <InputTeste
                    className="D"
                    id="input"onValueChange={(newValue) =>
                      handleInputChange("D", newValue)
                    }
                    value={pergunta.opcaoD}
                  />
                </div>
                <div id="itens-perguntas-group">
                  <label>E</label>
                  <InputTeste
                    className="E"
                    id="input"onValueChange={(newValue) =>
                      handleInputChange("E", newValue)
                    }
                    value={pergunta.opcaoE}
                  />
                </div>
                <Dropdown
                  key={perguntaIndex}
                  index={perguntaIndex}
                  onOptionSelected={handleOptionSelected}
                  value={pergunta.respostaCerta}
                />
              </div>
            ))}
          </section>
          <ButtonPrimary text="Salvar Teste" event={handleFinalizar} />
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
  
  
  
  
  
  
}

export default EditarTeste;
