import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Personaje = () => {
  const { id } = useParams();
  const [char, setChar] = useState(null);

  useEffect(() => {
    fetch(`https://dragonball-api.com/api/characters/${id}`)
      .then((res) => res.json())
      .then((data) => setChar(data));
  }, [id]);

  if (!char) return <p>Cargando personaje...</p>;

  return (
    <div className="personaje-detalle">
      <h1>{char.name}</h1>
      <img src={char.image} alt={char.name} className="personaje-img" />
      <p><strong>Ki:</strong> {char.ki}</p>
      <p><strong>Máximo Ki:</strong> {char.maxKi}</p>
      <p><strong>Raza:</strong> {char.race}</p>
      <p><strong>Género:</strong> {char.gender}</p>
      <p><strong>Afiliación:</strong> {char.affiliation}</p>
      <p><strong>Descripción:</strong> {char.description}</p>

      {char.originPlanet && (
        <>
          <h2>🌍 Planeta de Origen</h2>
          <img
            src={char.originPlanet.image}
            alt={char.originPlanet.name}
            className="personaje-img"
          />
          <p><strong>{char.originPlanet.name}</strong> — {char.originPlanet.isDestroyed ? "Destruido" : "Activo"}</p>
          <p>{char.originPlanet.description}</p>
        </>
      )}

      {char.transformations?.length > 0 && (
        <>
          <h2>⚡ Transformaciones</h2>
          <div className="transformaciones">
            {char.transformations.map((form) => (
              <div key={form.id} className="transformation">
                <h3>{form.name}</h3>
                <img src={form.image} alt={form.name} className="transformation-img" />
                <p>Ki: {form.ki}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Personaje;

