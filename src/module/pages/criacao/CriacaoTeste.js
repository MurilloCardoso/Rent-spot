import "./criacaoTeste.css";
import ButtonPrimary from "../../components/button/Button";
import InputTeste from "../../components/inputs/InputPerguntas/input";
import React, { useState, useRef, useEffect } from "react";
import Dropdown from "../../components/Dropdown/Dropdown";
import Api from "../../utils/Api";
import { useNavigate } from "react-router-dom";
function CriacaoTeste() {
  const navigate = useNavigate();
  useEffect(() => {
    if (
      localStorage.getItem("token") == null &&
      localStorage.getItem("username") == null
    ) {
      navigate("/sessao");
    }
  });

  const [perguntas, setPerguntas] = useState([]);
  const [contador, setContador] = useState(0);
  const [testeName, setTesteName] = useState("");
  const [inputValues, setInputValues] = useState({
    Teste: "",
    A: "",
    B: "",
    C: "",
    D: "",
    E: "",
  });

  const handleInputChange = (name, value) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleInputTesteNameChange = (value) => {
    setTesteName(value);
  };
  const [dropdowns, setDropdowns] = useState([]);

  const handleOptionSelected = (index, value) => {
    const updatedDropdowns = [...dropdowns];
    updatedDropdowns[index] = value;
    setDropdowns(updatedDropdowns);
  };
  function adicionarPergunta() {
    setPerguntas((prevPerguntas) => [
      ...prevPerguntas,
      <section className="form-perguntas">
        <label>Pergunta {contador + 1}</label>
        <InputTeste
          className="Teste"
          id="input"
          onValueChange={(newValue) => handleInputChange("Teste", newValue)}
        />
        <div id="itens-perguntas-group">
          <label>A</label>
          <InputTeste
            className="A"
            id="input"
            onValueChange={(newValue) => handleInputChange("A", newValue)}
          />
        </div>
        <div id="itens-perguntas-group">
          <label>B</label>
          <InputTeste
            className="B"
            id="input"
            onValueChange={(newValue) => handleInputChange("B", newValue)}
          />
        </div>
        <div id="itens-perguntas-group">
          <label>C</label>
          <InputTeste
            className="C"
            id="input"
            onValueChange={(newValue) => handleInputChange("C", newValue)}
          />
        </div>
        <div id="itens-perguntas-group">
          <label>D</label>
          <InputTeste
            className="D"
            id="input"
            onValueChange={(newValue) => handleInputChange("D", newValue)}
          />
        </div>
        <div id="itens-perguntas-group">
          <label>E</label>
          <InputTeste
            className="E"
            id="input"
            onValueChange={(newValue) => handleInputChange("E", newValue)}
          />
        </div>
        <div id="itens-perguntas-group">
          <label>Resposta Certa</label>
          <Dropdown
            id="dropdown"
            key={contador}
            index={contador}
            onOptionSelected={handleOptionSelected}
          />{" "}
        </div>
      </section>,
    ]);
    setContador((prevContador) => prevContador + 1);
  }
  function handleFinalizar() {
    if (testeName === "") {
      window.alert("o Campo do Nome teste se encontra vazio");
      return;
    }

    const perguntasArray = [];

    const inputs = document.querySelectorAll(".form-perguntas input");

    for (let i = 0; i < inputs.length; i += 6) {
      if (
        inputs[i].value === "" ||
        inputs[i + 1].value === "" ||
        inputs[i + 2].value === "" ||
        inputs[i + 3].value === "" ||
        inputs[i + 4].value === "" ||
        inputs[i + 5].value === ""
      ) {
        window.alert("Preencha todos os campos antes de prosseguir.");
        return;
      }

      const pergunta = {
        pergunta: inputs[i].value,
        opcaoA: inputs[i + 1].value,
        opcaoB: inputs[i + 2].value,
        opcaoC: inputs[i + 3].value,
        opcaoD: inputs[i + 4].value,
        opcaoE: inputs[i + 5].value,
      };
      perguntasArray.push(pergunta);
    }

    const finalData = [];
    let encontradoVazio = false;

    perguntasArray.forEach((pergunta, index) => {
      if (dropdowns[index] !== " ") {
        const perguntaComRespostaCerta = {
          ...pergunta,
          respostaCerta: dropdowns[index],
        };
        finalData.push(perguntaComRespostaCerta);
      } else {
        encontradoVazio = true;
        window.alert(
          "Preencha o Dropdown " + (index + 1) + " antes de prosseguir."
        );
        return; // Sair do loop forEach
      }
    });

    if (encontradoVazio) {
      return; // Sair da função
    }

    const jsonData = {
      nomeTeste: testeName,
      autor: localStorage.getItem("username"),
      perguntas: finalData,
    };

    console.log(jsonData);
    Api.InsertNovoTesteApi(jsonData)
      .then(() => {
        window.alert("Criadao com sucesso");
      })
      .catch((error) => {
        console.error("Erro ao inserir os dados:", error);
      });
  }

  return (
    <div style={{ textAlign: "center" }}>
      <div id="form-perguntas">
        <label>Nome Teste:</label>
        <InputTeste
          className="Teste"
          onValueChange={(newValue) => handleInputTesteNameChange(newValue)}
        />
      </div>
      {perguntas.map((pergunta, index) => (
        <div className="form-perguntas" key={index}>
          <div>{pergunta}</div>
        </div>
      ))}
      <ButtonPrimary text="+" event={adicionarPergunta} />
      <ButtonPrimary text="Criar Teste" event={handleFinalizar} />
    </div>
  );
}

export default CriacaoTeste;
