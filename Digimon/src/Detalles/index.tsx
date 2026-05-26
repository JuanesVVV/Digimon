import { useParams } from "react-router-dom";
import { useMemo, useState } from "react";

interface Digimon {
  name: string;
  img: string;
  level: string;
}

function Detalles() {
  const { name } = useParams<{ name: string }>();
  const [favoriteList, setFavoriteList] = useState<string[]>(() =>
    JSON.parse(localStorage.getItem("favorites") || "[]") as string[]
  );
  const isFavorite = useMemo(
    () => (name ? favoriteList.includes(name) : false),
    [favoriteList, name]
  );

  const digimon = useMemo<Digimon | null>(() => {
    if (!name) return null;
    const allDigimon = JSON.parse(localStorage.getItem("allDigimon") || "[]") as Digimon[];
    return allDigimon.find((d) => d.name === name) || null;
  }, [name]);

  const toggleFavorite = () => {
    if (!name) return;
    const updatedFavorites = [...favoriteList];

    if (updatedFavorites.includes(name)) {
      const newFavorites = updatedFavorites.filter((fav) => fav !== name);
      setFavoriteList(newFavorites);
    } else {
      const newFavorites = [...updatedFavorites, name];
      setFavoriteList(newFavorites);
    }

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites.includes(name) ? updatedFavorites.filter((fav) => fav !== name) : [...updatedFavorites, name]));
  };

  if (!digimon) return <p>No se encontró información del Digimon</p>;

  return (
    <div>
      <h1>{digimon.name}</h1>
      <button onClick={toggleFavorite}>
        {isFavorite ? "❤️ Quitar de favoritos" : "🤍 Agregar a favoritos"}
      </button>

      <div className="digimon-image">
        <img src={digimon.img} alt={digimon.name} />
      </div>

      <h2>Información</h2>
      <p><strong>Nombre:</strong> {digimon.name}</p>
      <p><strong>Nivel:</strong> {digimon.level}</p>
    </div>
  );
}

export default Detalles;