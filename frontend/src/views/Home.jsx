import { useContext } from 'react';
import { PizzaContext } from '../context/PizzasContext';
import Cards from '../components/Cards'
const Home = () => {
  const {pizzas,carrito}=useContext(PizzaContext)
  
  return (
    <div className="row pt-4">
      <div className="estiloHo">
        <div className="border-bottom border-dark-subtle" style={{width:'60%', color:'white', textAlign:'center'}}>
          <h1 className='pt-3'>!Pizzeria Mamma Mia!</h1>
          <p>!Tenemos las mejores pizzas que podras encontrar!</p>
        </div>
      </div>
      <div className="p-4">
        <div className='row d-flex justify-content-center'>
          {pizzas && pizzas.map((laspizzas)=>(<Cards laspizzas={laspizzas} key={laspizzas.id}></Cards>))}

        </div>
       
      </div>
    </div>
  );
};
export default Home;
