import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import HeaderComponents from "./module/components/Header/Header";
import Sessao from "./module/pages/sessao/Sessao";
import Home from "./module/pages/home/Home";
import Login from "./module/pages/login/Login";
import Cadastro from "./module/pages/cadastro/Cadastro";
import CriacaoTeste from "./module/pages/criacao/CriacaoTeste";

function Header() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/sessao";

  if (isLoginPage) {
    return null; // Oculta o Header na página de login
  }

  return <HeaderComponents />;
}

function ProtectedRoute({ element: Component, ...rest }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Link to="/sessao" replace />;
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
          <Route path="/sessao" element={<Sessao />} />

          <Route path="/criarTeste" element={<CriacaoTeste />}></Route>
          {/* <Route
            path="/criarTeste"
            element={<ProtectedRoute element={<CriacaoTeste />} />}
          /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
