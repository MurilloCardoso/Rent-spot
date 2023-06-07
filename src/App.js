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
import Resultados from "./module/pages/resultados/Resultados";
import CriacaoTeste from "./module/pages/criacao/CriacaoTeste";
import Responder from "./module/pages/responder/Responder";
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
          <Route path="/resultados" element={<Resultados />}></Route>
          <Route path="/criarTeste" element={<CriacaoTeste />}></Route>
          <Route path="/Responder/:id" element={< Responder/>}></Route>
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
