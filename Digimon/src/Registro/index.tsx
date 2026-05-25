import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import './style.css';

export default function Registro() {
  const [correo, setCorreo] = useState<string>('');
  const [contrasena, setContrasena] = useState<string>('');
  const navigate = useNavigate();

  const handleRegistro = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, correo, contrasena);
      alert('Cuenta creada correctamente. ¡Bienvenido!');
      navigate('/login');
    } catch (error: any) {
      alert('Error al registrarse: ' + error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="titulo">Registro</h1>
        <p className="subtitulo">Crea tu cuenta para acceder a tus favoritos</p>

        <form onSubmit={handleRegistro} className="form">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={correo}
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
            REGISTRARSE
          </button>
        </form>

        <button className="link-registro" onClick={() => navigate('/login')}>
          ¿Ya tienes cuenta? Inicia sesión aquí
        </button>
      </div>
    </div>
  );
}
