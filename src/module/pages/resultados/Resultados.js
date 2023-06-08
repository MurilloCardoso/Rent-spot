import { useState, useEffect } from "react";
import ListTile from "../../components/ListTIle/ListTile";
import Api from "../../utils/Api";
import Loading from "../../components/loading/Loading";
import {

 useNavigate,

} from "react-router-dom";
function Resultados() {

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) {
      navigate("/sessao");
      return null;
    }
  });

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
    <div style={{ textAlign: "center" }}>
      <h1>Resultados</h1>
      {testes === null ? ( // Verifica se os testes estão carregando

<Loading />

// Exibe o componente de loading enquanto os dados estão sendo buscados
) :(<>
      <div>
        {testes.map((teste, index) => (
          <ListTile
           
            title={teste.nomeTeste}
            subtitle={teste.autor}
            arg={""+teste.quantidadeAcertos}
          />
        ))}
      </div>
      </>)}
    </div>
  );
}

export default Resultados;
