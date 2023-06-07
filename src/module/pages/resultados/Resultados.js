import { useState, useEffect } from "react";
import ListTile from "../../components/ListTIle/ListTile";
import Api from "../../utils/Api";

function Resultados() {
  const [testes, setTestes] = useState([]);

  useEffect(() => {
    const fetchTestes = async () => {
      try {
        const resultados = await Api.LerResultados();
        setTestes(resultados);
      } catch (error) {
        console.error("Erro ao obter os resultados:", error);
      }
    };

    fetchTestes();
  }, []);

  return (
    <div>
      <h1>Resultados</h1>

      <div>
        {testes.map((teste, index) => (
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
