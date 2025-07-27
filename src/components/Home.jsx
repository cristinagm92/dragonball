
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const cleanKi = (value) => {
  if (!value) return 0;
  const raw = value.replace(/[^0-9]/g, "");
  return raw ? parseInt(raw, 10) : 0;
};

const Home = () => {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [kiRange, setKiRange] = useState([0, 1000000000]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllCharacters = async () => {
      let allCharacters = [];
      let page = 1;
      let keepGoing = true;

      try {
        while (keepGoing) {
          const res = await fetch(`https://dragonball-api.com/api/characters?page=${page}&limit=10`);
          const data = await res.json();

          if (Array.isArray(data.items) && data.items.length > 0) {
            allCharacters = [...allCharacters, ...data.items];
            page += 1;

            if (data.items.length < 10) keepGoing = false;
          } else {
            keepGoing = false;
          }
        }

        // Extra: llamada con filtros Saiyan
        const extra = await fetch(
          "https://dragonball-api.com/api/characters?race=Saiyan&affiliation=Z fighter"
        );
        const extraData = await extra.json();
        if (Array.isArray(extraData)) {
          allCharacters = [...allCharacters, ...extraData];
        }

        const uniqueCharacters = Array.from(
          new Map(allCharacters.map((char) => [char.id || char.name, char])).values()
        );

        setItems(uniqueCharacters);
      } catch (err) {
        setError("No se pudieron cargar los personajes.");
      }
    };

    fetchAllCharacters();
  }, []);

  const filtered = items.filter((char) => {
    const nameMatch = char.name?.toLowerCase().includes(query.toLowerCase());
    const ki = cleanKi(char.ki);
    const kiMatch = ki >= kiRange[0] && ki <= kiRange[1];
    return nameMatch && kiMatch;
  });

  const handleChange = (e) => setQuery(e.target.value);
  const handleRangeChange = (e, index) => {
    const newRange = [...kiRange];
    newRange[index] = Number(e.target.value);
    setKiRange(newRange);
  };

  return (
    <div className="app">
      <h1>🌟 Buscador de personajes Dragon Ball</h1>

      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={query}
        onChange={handleChange}
      />

      <div className="slider">
        <label>
          Mínimo ki:
          <input
            type="number"
            value={kiRange[0]}
            onChange={(e) => handleRangeChange(e, 0)}
          />
        </label>
        <label>
          Máximo ki:
          <input
            type="number"
            value={kiRange[1]}
            onChange={(e) => handleRangeChange(e, 1)}
          />
        </label>
      </div>

      {error && <p className="error">{error}</p>}
      {filtered.length === 0 && !error && <p>Cargando o sin resultados...</p>}

      <div className="results">
        {filtered.map((char) => (
          <Link
            to={`/personaje/${char.id}`}
            className="card"
            key={char.id || char.name}
          >
            <img
              src={char.image}
              alt={char.name}
              onError={(e) => { e.target.style.display = "none"; }}
            />
            <h3>{char.name}</h3>
            <p>Ki: {cleanKi(char.ki) || "Desconocido"}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
