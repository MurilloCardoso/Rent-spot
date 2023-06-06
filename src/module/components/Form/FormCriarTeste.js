import React, { useState } from "react";
import InputTeste from "../inputs/InputPerguntas/input";
function FormCriarTeste({
  onValueChangePaiA,
  onValueChangePaiB,
  onValueChangePaiC,
  onValueChangePaiD,
  onValueChangePaiE,
}) {
  const [inputValueE, setInputValueE] = useState("");

  return (
    <section className="form-perguntas">
      <label>Pergunta</label>
      <div id="itens-perguntas-group">
        <label>A</label>
        <InputTeste className="A" />
      </div>
      o
      <div id="itens-perguntas-group">
        <label>B</label>
        <InputTeste className="B" />
      </div>
      <div id="itens-perguntas-group">
        <label>C</label>
        <InputTeste className="C" />
      </div>
      <div id="itens-perguntas-group">
        <label>D</label>
        <InputTeste className="D" />
      </div>
      <div id="itens-perguntas-group">
        <label>E</label>
        <InputTeste className="E" />
      </div>
    </section>
  );
}
export default FormCriarTeste;
