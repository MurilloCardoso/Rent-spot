import Home from "./module/pages/home/Home";
import Header  from "./module/components/Header/Header";
import Login from "./module/pages/login/Login";
import Cadastro from "./module/pages/cadastro/Cadastro";
import CriacaoTeste from "./module/pages/criacao/criacaoTeste";
import {
  BrowserRouter as Router,
  Routes,
  Route,Link
} from "react-router-dom";

// ...

function ProtectedRoute({ element: Component, ...rest }) {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Link to="/login" replace />;
  }

  return <Route {...rest} element={<Component />} />;
}

function App() {
  return (
    <Router>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/pagina-protegida"
            element={<ProtectedRoute element={<CriacaoTeste />} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
