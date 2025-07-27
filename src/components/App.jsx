import '../styles/App.scss';


import { BrowserRouter, Routes, Route } from "react-router-dom";
import Personaje from "./Personaje";
import Home from "./Home"; // Tu componente original con las tarjetas


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/personaje/:id" element={<Personaje />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
