import "./homeStyle.css";
import ListTile from "../../components/ListTIle/ListTile";
import { useState, useEffect } from "react";
import Api from "../../utils/Api";
import Loading from "../../components/loading/Loading";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [testes, setTestes] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const excluir = (id, index) => {
    Api.DeleteTesteApi(id);
    const updatedTestes = [...testes];
    updatedTestes.splice(index, 1);
    setTestes(updatedTestes);
  };

  const editar = (id) => {
    navigate("/editar/" + id);
  };


  return (
    <div>
      <main className="main-home">
        <section className="top-teste">
          <div>
            <ListTile title={"Criar Teste"} url={"/criarTeste"} />
          </div>
          <div>
            <ListTile title={"Resultados"} url={"/resultados"} open={true} />
          </div>
        </section>
        {loading ? (
          <Loading />
        ) : (
          <>
            <section>
  <h1>Testes Criados</h1>

  {testes.length > 0 ? (
    <div style={{ overflowY: "scroll", maxHeight: "400px" }}>
      {testes.map((teste, index) => (
        <ListTile
          key={teste._id}
          title={teste.nomeTeste}
          subtitle={teste.autor}
          trailing={true}
          eventEdit={() => editar(teste._id)}
          url={"/responder/" + teste._id}
          leading={true}
          openResponder={true}
          event={() => excluir(teste._id, index)}
        />
      ))}
    </div>
  ) : (
    <div>
      <h3>Lista de Testes vazia</h3>
    </div>
  )}
</section>

          </>
        )}
      </main>
    </div>
  );
}

export default Home;
