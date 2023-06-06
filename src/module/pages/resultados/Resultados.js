import { useState } from "react";
import ListTile from "../../components/ListTIle/ListTile";
function Resultados() {
  const [Testes, setTestes] = useState([
    {
      autor: "Murillo",
      quantidadeAcertos: 5,
      
      nomeTeste: "Historia",
    },
 
  ]);
    return (
      <div >
      <h1>Resultadoss</h1>

     
      <div>
            {Testes.map((teste, index) => (
              <ListTile
                key={index}
                title={teste.nomeTeste}
                subtitle={teste.autor}
                arg={teste.quantidadeAcertos}
              />
            ))}
          </div>
      </div>
    );
  }
  
  export default Resultados;
  