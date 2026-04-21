import { useParams, Link } from "react-router";
import { useEffect, useState } from "react";

interface Digimon {
  name: string;
  img: string;
  level: string;
}

function FavoritosDetalle() {
  const { name } = useParams<{ name: string }>();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [digimon, setDigimon] = useState<Digimon | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  // 🔁 cargar favoritos desde localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(stored);

    if (name && stored.includes(name)) {
      setIsFavorite(true);
    }
  }, [name]);

  // 🔁 cargar detalle si hay un nombre en la URL
  useEffect(() => {
    if (!name) return;

    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://digimon-api.vercel.app/api/digimon/name/${name}`
        );
        const data = await res.json();
        setDigimon(data[0]);
      } catch (error) {
        console.error("Error cargando Digimon:", error);
      }
    };

    fetchData();
  }, [name]);

  const toggleFavorite = () => {
    if (!name) return;

    let updated = [...favorites];

    if (updated.includes(name)) {
      updated = updated.filter((fav) => fav !== name);
      setIsFavorite(false);
    } else {
      updated.push(name);
      setIsFavorite(true);
    }

    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div>
      <h1>Favoritos</h1>

      {favorites.length === 0 ? (
        <p>No tienes Digimon favoritos</p>
      ) : (
        <ul>
          {favorites.map((fav) => (
            <li key={fav}>
              <Link to={`/favoritos/${fav}`}>{fav}</Link>
            </li>
          ))}
        </ul>
      )}

      {digimon && (
        <div className="detalle">
          <h2>
            {digimon.name}
            <button onClick={toggleFavorite}>
              {isFavorite ? "❤️ Quitar de favoritos" : "🤍 Agregar a favoritos"}
            </button>
          </h2>
          <img src={digimon.img} alt={digimon.name} width="200" />
          <p><strong>Nivel:</strong> {digimon.level}</p>
        </div>
      )}
    </div>
  );
}

export default FavoritosDetalle;

