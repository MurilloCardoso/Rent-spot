import Home from "./module/pages/home/Home";
import Header  from "./module/components/Header/Header";
import Login from "./module/pages/login/Login";
import Cadastro from "./module/pages/cadastro/Cadastro";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>   
        <Header/>
        <div>
          <Routes>
              <Route exact path="/" element={<Home/>} > </Route>
          </Routes>
          <Routes>
              <Route path="/cadastro" element={<Cadastro/>} > </Route>
          </Routes>
          <Routes>
              <Route path="/login" element={<Login/>} > </Route>
          </Routes>
        </div>
      </Router>
  );
}

export default App;
