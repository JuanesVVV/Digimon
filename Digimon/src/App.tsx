import { BrowserRouter as Router, Routes, Route, Link } from "react-router";
import "./App.css";
import Home from "./Home";
import Favoritos from "./Favoritos";
import Detalles from "./Detalles";
import Informativa from "./Informativa";
import Original from "./Original"

function App() {
  return (
    <Router>
      <div>
        <nav className="menu">
          <Link to="/"> Home </Link>
          <Link to="/favoritos"> Favoritos </Link>
          <Link to="/informativa"> Informativa </Link>
          <Link to="/original"> Original </Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/digimon/:name" element={<Detalles />} />
          <Route path="/informativa" element={<Informativa />} />
          <Route path="/original" element={<Original />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
