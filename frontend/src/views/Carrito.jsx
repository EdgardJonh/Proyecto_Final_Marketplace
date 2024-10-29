import { useContext } from 'react';
import { PizzaContext } from '../context/PizzasContext';
const Carrito = () => {
    const {carrito, sumaTotal, incrementador, decrementador}=useContext(PizzaContext)
    // Acumulador para sumar eltotal
    
    // console.log(carrito)
  return (
     <>
     <div className='container'>
        <div className='row'>
          <div className="col-12">
              {/* lista de las pizzass */}
              <p>Detalles Carrito:</p>
              {carrito && 
            carrito.map((producto, index)=> (
                <div key={producto.id} className="d-flex col-sm-12 justify-content-between border-bottom p-2 align-items-center" style={{width:'100%'}}>
                <div className="d-flex align-items-center">
                  <img src={producto.imagen} alt=""  style={{width:'5rem'}}/>
                  <p className="mb-0 ms-2">{producto.nombre}</p>
                </div>
                <div className="d-flex align-items-center">
                  
                  <button className="btn btn-danger me-1" onClick={()=>decrementador(index,producto.id, producto.nombre)}>-</button>
                  <p className="mb-0">{producto.count}</p>
                  <button className="btn btn-primary ms-1" onClick={()=>incrementador(index)}>+</button>
                  <p className='mb-0 ms-2 me-2'>=</p>
                  <p className="mb-0 me-1">${producto.count * producto.precio }</p>
                </div>
              </div>
            ))
            
            }
           
            <h3 className='text-end'>Total:${sumaTotal}</h3>
            <button className="btn btn-success">Ir a Pagar</button>
          </div>
        </div>
     </div>
     </>
  );
};
export default Carrito;
