import React, { useState } from "react";
import "./inputTeste.css";

const InputTeste = ({ className, onValueChange }) => {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    onValueChange(newValue);
  };

  return (
    <input
      type="text"
      className={className}
      value={value}
      onChange={handleChange}
    />
  );
};

export default InputTeste;
