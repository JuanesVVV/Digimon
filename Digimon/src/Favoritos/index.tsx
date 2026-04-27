import { useEffect, useState } from "react";
import { Link } from "react-router";

function Favoritos() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(stored);
  }, []);

  return (
    <div>
      <h1>Favoritos</h1>
      {favorites.length === 0 ? (
        <p>No tienes Digimon favoritos</p>
      ) : (
        <ul>
          {favorites.map((digi) => (
            <li key={digi}>
              <Link to={`/digimon/${digi}`}>{digi}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Favoritos;

