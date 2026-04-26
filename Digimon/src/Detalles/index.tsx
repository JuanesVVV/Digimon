import { useParams } from "react-router";
import { useEffect, useState } from "react";

interface Digimon {
  name: string;
  img: string;
  level: string;
}

function Detalles() {
  const { name } = useParams<{ name: string }>();
  const [digimon, setDigimon] = useState<Digimon | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!name) return;

    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.includes(name));

    const allDigimon = JSON.parse(localStorage.getItem("allDigimon") || "[]");
    const found = allDigimon.find((d: Digimon) => d.name === name);
    if (found) setDigimon(found);
  }, [name]);

  const toggleFavorite = () => {
    if (!name) return;
    let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    if (favorites.includes(name)) {
      favorites = favorites.filter((fav: string) => fav !== name);
      setIsFavorite(false);
    } else {
      favorites.push(name);
      setIsFavorite(true);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  if (!digimon) return <p>No se encontró información del Digimon</p>;

  return (
    <div>
      <h1>{digimon.name}</h1>
      <button onClick={toggleFavorite}>
        {isFavorite ? "❤️ Quitar de favoritos" : "🤍 Agregar a favoritos"}
      </button>
      <img src={digimon.img} alt={digimon.name} width="200" />
      <h2>Información</h2>
      <p><strong>Nombre:</strong> {digimon.name}</p>
      <p><strong>Nivel:</strong> {digimon.level}</p>
    </div>
  );
}

export default Detalles;
