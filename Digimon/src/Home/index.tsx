import { useState, useEffect } from 'react'
import "./style.css";

interface Digimon {
  name: string
  img: string
  level: string
}

function Home() {
  const [digimons, setDigimons] = useState<Digimon[]>([])
  const [busqueda, setBusqueda] = useState('')
  const [nivelFiltro, setNivelFiltro] = useState<string>('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://digimon-api.vercel.app/api/digimon")
        const data = await res.json()
        setDigimons(data)
      } catch (error) {
        console.error("Error cargando Digimon:", error)
      }
    }
    fetchData()
  }, [])

  const digimonsFiltrados = digimons.filter((digi) =>
    (busqueda.length < 3 || digi.name.toLowerCase().includes(busqueda.toLowerCase())) &&
    (nivelFiltro === '' || digi.level === nivelFiltro)
  )

  const niveles = Array.from(new Set(digimons.map(d => d.level)))

  return (
    <>
      <div className="filtros">
        <button onClick={() => setNivelFiltro('')}>Todos</button>
        {niveles.map((nivel) => (
          <button
            key={nivel}
            onClick={() => setNivelFiltro(nivel)}
            className={nivelFiltro === nivel ? 'activo' : ''}
          >
            {nivel}
          </button>
        ))}
      </div>

      <input
        type="text"
        placeholder="Buscar Digimon..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <div className="tabla-container">
        <h2>Lista de Digimon</h2>
        <table className="tabla-digimon">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Nivel</th>
            </tr>
          </thead>
          <tbody>
            {digimonsFiltrados.map((digi, index) => (
              <tr key={index}
                  className={
                    busqueda.length >= 3 &&
                    digi.name.toLowerCase().includes(busqueda.toLowerCase())
                      ? 'resaltado'
                      : ''
                  }
              >
                <td><img src={digi.img} alt={digi.name} width="60" /></td>
                <td>{digi.name}</td>
                <td>{digi.level}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Home
