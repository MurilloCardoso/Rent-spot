import React, { useState } from "react";
import "./inputTeste.css";

const InputTeste = ({ className, onValueChange, value }) => {
  const [inputValue, setInputValue] = useState(value || "");

  const handleChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    onValueChange(newValue);
  };

  return (
    <input
      type="text"
      className={className}
      value={inputValue}
      onChange={handleChange}
    />
  );
};

export default InputTeste;
