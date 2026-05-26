import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import './style.css';

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert('Has cerrado sesión correctamente');
      navigate('/login'); // Redirige al login tras cerrar sesión
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert('Error al cerrar sesión: ' + error.message);
      } else {
        alert('Error al cerrar sesión: desconocido');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box" style={{ textAlign: 'center' }}>
        <h1 className="titulo">¿Cerrar sesión?</h1>
        <p className="subtitulo">Esperamos verte pronto de vuelta</p>
        
        <button onClick={handleLogout} className="boton-login">
          CERRAR SESIÓN
        </button>
        
        <button className="link-registro" onClick={() => navigate('/')}>
          Volver al Home
        </button>
      </div>
    </div>
  );
}