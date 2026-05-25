import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import './style.css';

interface Usuario {
  id: string;
  nombre: string;
  correo: string;
  ganados: number;
  perdidos: number;
}

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'usuarios'));
        const listaUsuarios: Usuario[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        })) as Usuario[];
        setUsuarios(listaUsuarios);
      } catch (error) {
        console.error("Error al obtener usuarios: ", error);
      } finally {
        setCargando(false);
      }
    };
    fetchUsuarios();
  }, []);

  if (cargando) return <div className="login-container" style={{color: '#FFF'}}>Cargando usuarios...</div>;

  return (
    <div className="login-container" style={{ alignItems: 'flex-start', padding: '40px' }}>
      <h1 className="titulo">Comunidad</h1>
      <div className="usuarios-grid">
        {usuarios.map((u) => (
          <div key={u.id} className="usuario-card">
            <h3 style={{ color: '#FFF' }}>{u.nombre}</h3>
            <p style={{ color: '#888', fontSize: '14px' }}>{u.correo}</p>
            <div className="stats-row">
              <span style={{ color: '#00FFD1' }}>G: {u.ganados}</span>
              <span style={{ color: '#FF0055' }}>P: {u.perdidos}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}