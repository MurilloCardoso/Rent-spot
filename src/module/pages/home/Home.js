import "./homeStyle.css";
import ListTile from "../../components/ListTIle/ListTile";
import { useState,useEffect } from "react";
import Api from "../../utils/Api"
import { Link } from "react-router-dom";
function Home() {
  const [Testes, setTestes] = useState([

  ]);
  useEffect(() => {
    const fetchTestes = async () => {
      try {
        const resultados = await Api.LerTesteCriados();
        setTestes(resultados);
      } catch (error) {
        console.error("Erro ao obter os resultados:", error);
      }
    };

    fetchTestes();
  }, []);
  return (
    <div>
      <main className="main-home">
        <section className="top-teste">
          <div>
            <Link to="/criarTeste">
              <ListTile title={"Criar Teste"} open={true} />
            </Link>
          </div>
          <div><Link to="/resultados">
            <ListTile title={"Resultados"} open={true} /></Link>
          </div>
        </section>
        <section>
          <div>
            {Testes.map((teste, index) => (
              <Link to={`/responder/${index}`} key={index}>
              <ListTile
                key={index}
                title={teste.nomeTeste}
                subtitle={teste.autor}
                open={false}
                trailing={true}
                leading={true}
              /></Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
