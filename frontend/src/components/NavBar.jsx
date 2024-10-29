import { useContext } from 'react';
import { PizzaContext } from '../context/PizzasContext';
import { NavLink } from "react-router-dom";

const Navbars = () => {
  const {sumaTotal}=useContext(PizzaContext)
    const setActiveClass = ({isActive})=>(isActive ? 'isActive' : 'noActive')
  return (
    <div className="bg-primary fixed-top">
        <div className="d-flex justify-content-around" style={{padding:'10px'}}>
            <NavLink className={setActiveClass} to="/">🍕Pizzeria Mamma Mia!</NavLink>
            <NavLink className={setActiveClass} to="Carrito">🛒${sumaTotal}</NavLink>
        </div>
    </div>
  );
};
export default Navbars;