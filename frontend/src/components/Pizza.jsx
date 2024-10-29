import { useNavigate, useParams } from "react-router-dom";
import { useContext } from 'react';
import { PizzaContext } from '../context/PizzasContext';
const Pizza = () => {
    // para volver atras 
    const navigate= useNavigate()
    // captura el id de la url 
    const {id}=useParams()
    // trae los datos del context
    const {pizzas, addCarrito}=useContext(PizzaContext)
    
    let laPizza = pizzas.find((item)=>item.id ==id)
    const listaIngredientes = laPizza.ingredientes.map((item,index)=>{return <li key={index} style={{listStyle:'none'}}>🍕{item}</li>})
    
  return (
    <>
      <div className="row p-3 d-flex justify-content-center">
        <div className="card m-3" style={{ maxWidth: "1140px" }}>
          <div className="row g-0">
            <div className="col-md-4">
              <img src={laPizza.imagen} className="img-fluid rounded-start" alt="..." />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title border-bottom">{laPizza.nombre}</h5>
                <p className="card-text">
                    {laPizza.descripcion}
                </p>
                <p className="card-text">
                  <small className="text-muted">Ingredientes:</small>
                </p>
                <ul>
                  {listaIngredientes}
                </ul>
                <div className="d-flex justify-content-between">
                  <h3>Precio: {laPizza.precio}</h3>
                  <button className="btn btn-danger" onClick={()=>addCarrito(laPizza)}>Anadir 🛒</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Pizza;
