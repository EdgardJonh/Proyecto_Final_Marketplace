// src/routes/pizzaRoutes.js
const express = require('express');
const router = express.Router();
const pizzaController = require('../controllers/pizzaController');

// Rutas para las pizzas
router.get('/', pizzaController.getPizzas);
router.post('/', pizzaController.addPizza);
router.put('/:id', pizzaController.updatePizza);
router.delete('/:id', pizzaController.removePizza);

module.exports = router;