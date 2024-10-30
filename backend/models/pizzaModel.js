// src/models/pizzaModel.js
const dotenv = require('dotenv');
dotenv.config();
const { Pool } = require('pg');
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Obtener todas las pizzas
const getAllPizzas = async () => {
  const result = await pool.query(`
    SELECT p.id, p.nombre, p.precio, p.descripcion, p.imagen,
           array_agg(i.nombre) AS ingredientes
    FROM pizzas p
    LEFT JOIN pizza_ingredientes pi ON p.id = pi.pizza_id
    LEFT JOIN ingredientes i ON pi.ingrediente_id = i.id
    GROUP BY p.id;
  `);
  return result.rows;
};

// Crear una nueva pizza
const createPizza = async (pizza) => {
  const { nombre, precio, descripcion, imagen } = pizza;
  const result = await pool.query(
    'INSERT INTO pizzas (nombre, precio, descripcion, imagen) VALUES ($1, $2, $3, $4) RETURNING *',
    [nombre, precio, descripcion, imagen]
  );
  return result.rows[0];
};

// Actualizar una pizza
const updatePizza = async (id, pizza) => {
  const { nombre, precio, descripcion, imagen } = pizza;
  const result = await pool.query(
    'UPDATE pizzas SET nombre = $1, precio = $2, descripcion = $3, imagen = $4 WHERE id = $5 RETURNING *',
    [nombre, precio, descripcion, imagen, id]
  );
  return result.rows[0];
};

// Eliminar una pizza
const deletePizza = async (id) => {
  await pool.query('DELETE FROM pizzas WHERE id = $1', [id]);
};

module.exports = {
  getAllPizzas,
  createPizza,
  updatePizza,
  deletePizza,
};