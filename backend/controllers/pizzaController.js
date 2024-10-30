// src/controllers/pizzaController.js
const pizzaModel = require('../models/pizzaModel');

// Obtener todas las pizzas
const getPizzas = async (req, res) => {
  try {
    const pizzas = await pizzaModel.getAllPizzas();
    res.json(pizzas);
  } catch (err) {
    console.error('Error al obtener las pizzas:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Crear una nueva pizza
const addPizza = async (req, res) => {
  try {
    const newPizza = await pizzaModel.createPizza(req.body);
    res.status(201).json(newPizza);
  } catch (err) {
    console.error('Error al crear la pizza:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Actualizar una pizza
const updatePizza = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedPizza = await pizzaModel.updatePizza(id, req.body);
    res.json(updatedPizza);
  } catch (err) {
    console.error('Error al actualizar la pizza:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Eliminar una pizza
const removePizza = async (req, res) => {
  const { id } = req.params;
  try {
    await pizzaModel.deletePizza(id);
    res.status(204).send();
  } catch (err) {
    console.error('Error al eliminar la pizza:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  getPizzas,
  addPizza,
  updatePizza,
  removePizza,
};