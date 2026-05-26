import { useState } from "react";
import { Link } from "react-router-dom";

function Favoritos() {
  const [favorites] = useState<string[]>(() =>
    JSON.parse(localStorage.getItem("favorites") || "[]") as string[]
  );

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

