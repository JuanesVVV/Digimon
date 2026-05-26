import { useEffect, useState } from "react";

interface Digimon {
  name: string;
  img: string;
  level: string;
}

function Original() {
  const [digimons, setDigimons] = useState<Digimon[]>([]);
  const [actual, setActual] = useState<Digimon | null>(null);
  const [respuesta, setRespuesta] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [puntos, setPuntos] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://digimon-api.vercel.app/api/digimon");
      const data = await res.json();
      setDigimons(data);
      if (data.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.length);
        setActual(data[randomIndex]);
      }
    };
    fetchData();
  }, []);

  const verificarRespuesta = () => {
    if (!actual) return;
    if (respuesta.trim().toLowerCase() === actual.name.toLowerCase()) {
      setMensaje("✅ ¡Correcto! Era " + actual.name);
      setPuntos(puntos + 1);
    } else {
      setMensaje("❌ Incorrecto. Era " + actual.name);
    }
  };

  const nuevoDigimon = (lista: Digimon[] = digimons) => {
    if (lista.length === 0) return;
    const randomIndex = Math.floor(Math.random() * lista.length);
    setActual(lista[randomIndex]);
    setRespuesta("");
    setMensaje("");
  };

  if (!actual) return <p>Cargando juego...</p>;

  return (
    <div>
      <h1>Juego Original: Adivina el Digimon</h1>
      <p>Escribe el nombre del Digimon que ves en la imagen. ¡Cada acierto suma puntos!</p>

      <img src={actual.img} alt="Digimon misterioso" width="200" />

      <div>
        <input
          type="text"
          placeholder="Escribe el nombre..."
          value={respuesta}
          onChange={(e) => setRespuesta(e.target.value)}
        />
        <button onClick={verificarRespuesta}>Verificar</button>
        <button onClick={() => nuevoDigimon()}>Nuevo Digimon</button>
      </div>

      {mensaje && <p>{mensaje}</p>}
      <p><strong>Puntos:</strong> {puntos}</p>
    </div>
  );
}

export default Original;
