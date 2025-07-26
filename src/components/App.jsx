import '../styles/App.scss';
import React, { useState, useEffect } from "react";


const App = () => {
  const [query, setQuery] = useState("");
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState(null);
  const [kiRange, setKiRange] = useState([0, 1000000000000]);
  const [loading, setLoading] = useState(false);

  const fetchAllCharacters = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://dragonball-api.com/api/characters?limit=1000");
      if (!res.ok) throw new Error("Error al cargar personajes");
      const data = await res.json();
      const items = Array.isArray(data.items) ? data.items : [];
      setCharacters(items);
      setError(null);
    } catch (err) {
      setError(err.message);
      setCharacters([]);
    } finally {
      setLoading(false);
    }
  };

  const filterCharacters = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://dragonball-api.com/api/characters?limit=1000");
      if (!res.ok) throw new Error("Error al cargar personajes");
      const data = await res.json();
      const items = Array.isArray(data.items) ? data.items : [];

      const filtered = items.filter((char) => {
        const nameMatch = char.name?.toLowerCase().includes(query.toLowerCase());
        const rawKi = char.ki?.replace(/\D/g, "");
        const ki = rawKi ? parseInt(rawKi) : 0;
        const kiMatch = ki >= kiRange[0] && ki <= kiRange[1];
        return nameMatch && kiMatch;
      });

      setCharacters(filtered);
      setError(null);
    } catch (err) {
      setError(err.message);
      setCharacters([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query.length === 0 && kiRange[0] === 0 && kiRange[1] === 1000000000000) {
      fetchAllCharacters();
    } else {
      filterCharacters();
    }
  }, [query, kiRange]);

  return (
    <div className="app">
      <h1>🔍 Buscador Dragon Ball</h1>

      <input
        type="text"
        placeholder="Buscar personaje..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Buscar por nombre"
      />

      <div className="slider">
        <label>Rango de Ki:</label>
        <input
          type="range"
          min="0"
          max="1000000000000"
          value={kiRange[0]}
          onChange={(e) =>
            setKiRange([parseInt(e.target.value), kiRange[1]])
          }
        />
        <input
          type="range"
          min="0"
          max="1000000000000"
          value={kiRange[1]}
          onChange={(e) =>
            setKiRange([kiRange[0], parseInt(e.target.value)])
          }
        />
        <p>
          Min: {kiRange[0].toLocaleString()} - Max:{" "}
          {kiRange[1].toLocaleString()}
        </p>
      </div>

      {loading && <p>Cargando personajes...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && characters.length === 0 && (
        <p>No se encontraron personajes con ese criterio.</p>
      )}

      <div className="results">
        {characters.map((char) => (
          <div key={char.id} className="card">
            <img src={char.image} alt={char.name} />
            <h2>{char.name}</h2>
            <p>{char.description}</p>
            <p>⚡ Ki: {char.ki || "No disponible"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
