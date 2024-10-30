import { useContext } from 'react';
import { PizzaContext } from '../context/PizzasContext';
import { NavLink } from "react-router-dom";

const Navbars = () => {
  const {sumaTotal}=useContext(PizzaContext)
    const setActiveClass = ({isActive})=>(isActive ? 'isActive' : 'noActive')
  return (
    <div className="bg-primary fixed-top">
      <div className="d-flex justify-content-between" style={{padding:'20px'}}>
        <div className='me-3'>
            <NavLink className={setActiveClass} to="/">🍕Pizzeria Mamma Mia!</NavLink>
           
        </div>
        <div className='d-flex justify-content-around '>
          <div className='me-3'>
          <NavLink className={setActiveClass} to="Carrito">🛒${sumaTotal}</NavLink>
          </div>
        <div className='ms-3'>
        <NavLink className={setActiveClass} to="PizzaCRUD">👨‍🍳 Admin</NavLink>
        </div>
        
        </div>
      </div>
       
    </div>
  );
};
export default Navbars;