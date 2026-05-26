import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig'; 
import { useNavigate } from 'react-router-dom';
import './style.css';

export default function Login() {
  const [correo, setCorreo] = useState<string>('');
  const [contrasena, setContrasena] = useState<string>('');
  const navigate = useNavigate();

  // Definimos el tipo del evento para el formulario
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, correo, contrasena);
      alert('¡Bienvenido!');
      navigate('/');
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert('Error: ' + error.message);
      } else {
        alert('Error desconocido');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="titulo">Iniciar Sesión</h1>
        <p className="subtitulo">Accede para ver tu contenido favorito</p>
        
        <form onSubmit={handleLogin} className="form">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={correo}
            // Tipo de evento para inputs
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCorreo(e.target.value)}
            className="input"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setContrasena(e.target.value)}
            className="input"
            required
          />
          <button type="submit" className="boton-login">
            INICIAR SESIÓN
          </button>
        </form>

        <button className="link-registro" onClick={() => navigate('/registro')}>
          ¿No tienes cuenta? Regístrate aquí
        </button>
      </div>
    </div>
  );
}