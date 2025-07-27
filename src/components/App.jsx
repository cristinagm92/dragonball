import '../styles/App.scss';

import { HashRouter, Routes, Route } from "react-router-dom";
import Personaje from "./Personaje";
import Home from "./Home";

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/personaje/:id" element={<Personaje />} />
      </Routes>
    </HashRouter>
  );
};

export default App;

