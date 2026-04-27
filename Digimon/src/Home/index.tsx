import { useState, useEffect } from "react";
import { Link } from "react-router";

interface Digimon {
  name: string;
  img: string;
  level: string;
}

function Home() {
  const [digimons, setDigimons] = useState<Digimon[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [nivelFiltro, setNivelFiltro] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://digimon-api.vercel.app/api/digimon");
      const data = await res.json();
      setDigimons(data);
      localStorage.setItem("allDigimon", JSON.stringify(data));
    };
    fetchData();
  }, []);

  const niveles = Array.from(new Set(digimons.map((d) => d.level)));

  const digimonsFiltrados = digimons.filter(
    (d) =>
      (busqueda.length < 3 ||
        d.name.toLowerCase().includes(busqueda.toLowerCase())) &&
      (nivelFiltro === "" || d.level === nivelFiltro)
  );

  return (
    <div>
      <h1>Lista de Digimon</h1>

      <div className="filtros">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <button onClick={() => setNivelFiltro("")}>Todos</button>
        {niveles.map((nivel) => (
          <button
            key={nivel}
            onClick={() => setNivelFiltro(nivel)}
            className={nivelFiltro === nivel ? "activo" : ""}
          >
            {nivel}
          </button>
        ))}
      </div>

      <ul>
        {digimonsFiltrados.map((digi) => (
          <li key={digi.name}>
            <Link to={`/digimon/${digi.name}`}>
              <img src={digi.img} alt={digi.name} width="50" /> {digi.name} -{" "}
              {digi.level}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;

