const express = require("express");
const router = express.Router();
const veiculoController = require("../controllers/VeiculoVendaController");
const verificacao = require('../requireAuth');

router.get("/carro/getById/:id", verificacao, veiculoController.getById);

router.put("/carro/:id", verificacao, veiculoController.update);

module.exports = router;
