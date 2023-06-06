import {useState} from "react"

const Dropdown = ({ index, onOptionSelected }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    onOptionSelected(index, value);
  };

  return (
    <select name="Opcoes" id={`opcoes-${index}`} onChange={handleOptionChange}>
      <option value="">Selecione uma opção</option>
      <option value="A">A</option>
      <option value="B">B</option>
      <option value="C">C</option>
      <option value="D">D</option>
      <option value="E">E</option>
    </select>
  );
};
export default Dropdown;