import "./homeStyle.css";
import ListTile from "../../components/ListTIle/ListTile";
import { useState } from "react";
import { Link } from "react-router-dom";
function Home() {
  const [Testes, setTestes] = useState([
    {
      autor: "Murillo",
      quantidadePerguntas: 5,
      nomeTeste: "Historia",
    },
    {
      autor: "Marcio",
      quantidadePerguntas: 10,
      nomeTeste: "Matematica",
    },
    {
      autor: "Mateus",
      quantidadePerguntas: 50,
      nomeTeste: "Ciência",
    },
    {
      autor: "Mateus",
      quantidadePerguntas: 50,
      nomeTeste: "Ciência",
    },
  ]);

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
              <Link to="/responder">
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
