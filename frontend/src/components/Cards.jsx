import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { PizzaContext } from '../context/PizzasContext';
const Cards = ({laspizzas}) => {
  const {addCarrito,carrito}=useContext(PizzaContext)
  const navigate = useNavigate()
  const listaitem = laspizzas.ingredientes.map((item,index)=>{return <li key={index} style={{listStyle:'none'}}>🍕{item}</li>})
  

  return (
    <>
      <div className="card m-2 p-0 shadow mb-5 bg-white rounded" style={{ width: "15rem" }}>
        <img src={laspizzas.imagen} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title border-bottom">{laspizzas.nombre}</h5>
          <p
            className="card-text"
            style={{ fontWeight: "600", fontSize: "small" }}
          >
           
            Ingredientes:
          </p>
         <ul>
          {listaitem}
         </ul>
          
        </div>
        <div className="border-top p-3 text-center">
          <p>${laspizzas.precio}</p>
          <button className="btn btn-warning me-1" onClick={()=>navigate(`/Pizza/${laspizzas.id}`)}>Ver Mas👀</button>
         {/* me llevo la pizza completa  */}
          <button className="btn btn-success ms-1  position-relative" onClick={()=>addCarrito(laspizzas)}>Anadir🛒
          
          {carrito && carrito.map((carrito, index)=>(<span key={index} className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {carrito.id == laspizzas.id ? carrito.count: null}
          
          </span>))}
          </button>
        </div>
      </div>
    </>
  );
};
export default Cards;
