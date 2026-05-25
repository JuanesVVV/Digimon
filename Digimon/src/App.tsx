import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";
import "./App.css";

// Componentes
import Home from "./Home";
import Favoritos from "./Favoritos";
import Detalles from "./Detalles";
import Informativa from "./Informativa";
import Original from "./Original";
import Login from "./Login";
import Registro from "./Registro";
import Logout from "./Logout";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Escucha el estado de autenticación
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div>Cargando...</div>;

  return (
    <Router>
      <div>
        <nav className="menu">
          {user ? (
            // Menú cuando el usuario está LOGUEADO
            <>
              <Link to="/"> Home </Link>
              <Link to="/favoritos"> Favoritos </Link>
              <Link to="/informativa"> Informativa </Link>
              <Link to="/original"> Original </Link>
              <Link to="/logout"> Logout </Link>
            </>
          ) : (
            // Menú cuando el usuario NO está logueado
            <>
              <Link to="/login"> Login </Link>
              <Link to="/registro"> Registro </Link>
            </>
          )}
        </nav>

        <Routes>
          {user ? (
            // Rutas protegidas (solo accesibles si hay usuario)
            <>
              <Route path="/" element={<Home />} />
              <Route path="/favoritos" element={<Favoritos />} />
              <Route path="/digimon/:name" element={<Detalles />} />
              <Route path="/informativa" element={<Informativa />} />
              <Route path="/original" element={<Original />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : (
            // Rutas públicas (solo login/registro)
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Registro />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
