import React from 'react';
import "./IconStyle.css";
import { IconContext } from 'react-icons';
import { BiHelpCircle } from 'react-icons/bi';

function IconButton({ iconName, title }) {
  const IconComponent = iconName ? IconMapping[iconName] : BiHelpCircle;

  return (
    <div>
          <IconComponent className="icon" />
          <h3 className='title'>{title}</h3>
    
    </div>
  );
}

const IconMapping = {
  // Mapeie os nomes dos ícones para os respectivos componentes de ícone
  // que deseja usar. Aqui estão alguns exemplos:
  biHelpCircle: BiHelpCircle,
  // Outros ícones podem ser adicionados aqui
};

export default IconButton;
