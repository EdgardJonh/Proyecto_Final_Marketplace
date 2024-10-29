// index.js
const express = require('express');
const { Pool } = require('pg');
const cors = require("cors")
const dotenv = require('dotenv');

// Cargar variables de entorno
dotenv.config();

// Crear una instancia de Express
const app = express();
app.use(cors());
const port = process.env.PORT;

// Configurar la conexión a la base de datos PostgreSQL
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Ruta para obtener todas las pizzas con sus ingredientes
app.get('/pizzas', async (req, res) => {
  try {
    const query = `
      SELECT p.id, p.nombre, p.precio, p.descripcion, p.imagen,
             array_agg(i.nombre) AS ingredientes
      FROM pizzas p
      JOIN pizza_ingredientes pi ON p.id = pi.pizza_id
      JOIN ingredientes i ON pi.ingrediente_id = i.id
      GROUP BY p.id;
    `;

    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener las pizzas:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
