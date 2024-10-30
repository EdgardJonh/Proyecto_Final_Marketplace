// frontend/src/components/PizzaCRUD.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const PizzaCRUD = () => {
  const [pizzas, setPizzas] = useState([]);
  const [pizza, setPizza] = useState({ id: '', nombre: '', precio: '', descripcion: '', imagen: '' });
  const [isEditing, setIsEditing] = useState(false);

  // Obtener las pizzas del backend
  const fetchPizzas = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/pizzas');
      setPizzas(response.data);
    } catch (error) {
      console.error('Error al obtener las pizzas:', error);
    }
  };

  useEffect(() => {
    fetchPizzas();
  }, []);

  // Manejar el cambio en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPizza({ ...pizza, [name]: value });
  };

  // Agregar o actualizar una pizza
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/pizzas/${pizza.id}`, pizza);
      } else {
        await axios.post('http://localhost:5000/api/pizzas', pizza);
      }
      setPizza({ id: '', nombre: '', precio: '', descripcion: '', imagen: '' });
      setIsEditing(false);
      fetchPizzas();
    } catch (error) {
      console.error('Error al guardar la pizza:', error);
    }
  };

  // Editar una pizza
  const handleEdit = (pizza) => {
    setPizza(pizza);
    setIsEditing(true);
  };

  // Eliminar una pizza
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/pizzas/${id}`);
      fetchPizzas();
    } catch (error) {
      console.error('Error al eliminar la pizza:', error);
    }
  };

  return (
    <div className="container " style={{marginTop:'10%'}}>
      <h2>Administrar Pizzas</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            name="nombre"
            value={pizza.nombre}
            onChange={handleChange}
            placeholder="Nombre"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="precio" className="form-label">Precio</label>
          <input
            type="number"
            className="form-control"
            name="precio"
            value={pizza.precio}
            onChange={handleChange}
            placeholder="Precio"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">Descripción</label>
          <textarea
            className="form-control"
            name="descripcion"
            value={pizza.descripcion}
            onChange={handleChange}
            placeholder="Descripción"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="imagen" className="form-label">URL de la Imagen</label>
          <input
            type="text"
            className="form-control"
            name="imagen"
            value={pizza.imagen}
            onChange={handleChange}
            placeholder="URL de la imagen"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {isEditing ? 'Actualizar Pizza' : 'Agregar Pizza'}
        </button>
      </form>

      <h3>Lista de Pizzas</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Descripción</th>
            <th scope="col">Imagen</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pizzas.map((p) => (
            <tr key={p.id}>
              <td>{p.nombre}</td>
              <td>${p.precio}</td>
              <td>{p.descripcion}</td>
              <td><img src={p.imagen} alt={p.nombre} style={{ width: '50px' }} /></td>
              <td>
                <button className="btn btn-warning me-2" onClick={() => handleEdit(p)}>Editar</button>
                <button className="btn btn-danger" onClick={() => handleDelete(p.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PizzaCRUD;