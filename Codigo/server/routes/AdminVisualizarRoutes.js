const express = require('express');
const router = express.Router();
const AdminVisualizarController = require('../controllers/AdminVisualizarController');

// Rota para obter todas as manutenções
router.get('/AdminVisualizar', AdminVisualizarController.getAll);

module.exports = router;
