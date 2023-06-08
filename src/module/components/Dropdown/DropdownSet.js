import React, { useState } from "react";

const DropdownSet = ({ index, onOptionSelected, value }) => {
  const [selectedOption, setSelectedOption] = useState(value || "");

  const handleOptionChange = (event) => {

    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    onOptionSelected(index, selectedValue);
  };

  return (
    <select name="Opcoes" value={selectedOption} id={`opcoes-${index}`} onChange={handleOptionChange}>

      <option value="A">A</option>
      <option value="B">B</option>
      <option value="C">C</option>
      <option value="D">D</option>
      <option value="E">E</option>
    </select>
  );
};

export default DropdownSet;