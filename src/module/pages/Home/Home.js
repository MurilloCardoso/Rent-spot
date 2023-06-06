import "./homeStyle.css";
import ListTile from "../../components/ListTIle/ListTile";
import { useState } from "react";

function Home() {
  const [Testes, setTestes] = useState([
    {
      autor: "Murillo",
      quantidadePerguntas: 5,
      nomeTeste: "Historia"
    },
    {
      autor: "Marcio",
      quantidadePerguntas: 10,
      nomeTeste: "Matematica"
    },
    {
      autor: "Mateus",
      quantidadePerguntas: 50,
      nomeTeste: "Ciência"
    }
  ]);

  return (
    <div className="main">
      <h1>home</h1>
      <main className="main">
        <section className="top-teste">
          <div>
            <ListTile title={"Criar Teste"} open={true} />
          </div>
          <div>
            <ListTile title={"Resultados"} open={true} />
          </div>
        </section>
        <section>
          <div>
      
            {Testes.map((teste, index) => (
              <ListTile
                key={index}
                title={teste.nomeTeste}
                subtitle={teste.autor}
                open={false}
                trailing={true}
                
                leading={true}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
