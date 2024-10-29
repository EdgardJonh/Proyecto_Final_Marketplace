import Home from "./views/Home";

import Pizza from "./components/Pizza";
import Carrito from "./views/Carrito";
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PizzaProvider from "./context/PizzasContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <PizzaProvider>
          <NavBar></NavBar>

          <Routes>
            <Route path="/" element={<Home />} />
           
            <Route path="/Pizza/:id" element={<Pizza />} />
            <Route path="/Carrito" element={<Carrito />} />
          </Routes>
        </PizzaProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
