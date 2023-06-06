import "./criacaoTeste.css";
import ButtonPrimary from "../../components/button/Button";
import InputTeste from "../../components/inputs/InputPerguntas/input";
import React, { useState, useRef } from "react";
import Dropdown  from "../../components/Dropdown/Dropdown";
import Api from "../../utils/Api";
function CriacaoTeste() {
  const [perguntas, setPerguntas] = useState([]);
  const [contador, setContador] = useState(0);
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
  const [dropdowns, setDropdowns] = useState([]);

  const handleAddDropdown = () => {
    setDropdowns([...dropdowns, ""]);
  };

  const handleOptionSelected = (index, value) => {
    const updatedDropdowns = [...dropdowns];
    updatedDropdowns[index] = value;
    setDropdowns(updatedDropdowns);
  };
  function adicionarPergunta() {
    setPerguntas((prevPerguntas) => [
      ...prevPerguntas,
      <section key={contador} className="form-perguntas">
        <label>Pergunta</label>
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
    
        <Dropdown key={contador} index={contador} onOptionSelected={handleOptionSelected} />
  
      </section>,
    ]);
    setContador((prevContador) => prevContador + 1);
  }
  function handleFinalizar() {
    console.log(dropdowns);
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
      perguntas: finalData,
    };
  console.log(jsonData)
   Api.InsertNovoTesteApi(jsonData);
  }
  

  return (
    <div>
      <div id="itens-perguntas-group">
        <label>Nome Teste:</label>
        <InputTeste
          className="Teste"
          onValueChange={(newValue) => handleInputChange("Teste", newValue)}
        />
      </div>
      {perguntas.map((pergunta, index) => (
        <div className="form-perguntas" key={index}>
          <label>{index}</label>
          <div>{pergunta}</div>
        </div>
      ))}
      <ButtonPrimary text="+" event={adicionarPergunta} />
      <ButtonPrimary text="Criar Teste" event={handleFinalizar} />
    </div>
  );
}

export default CriacaoTeste;
