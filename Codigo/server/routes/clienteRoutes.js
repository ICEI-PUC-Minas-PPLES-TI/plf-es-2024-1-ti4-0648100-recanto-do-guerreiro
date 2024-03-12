const express = require("express");
const router = express.Router();
const cliente = require("../controllers/clienteController");
const verificacao = require('../requireAuth');

router.post("/cliente", verificacao, cliente.create);
router.get("/oficina", verificacao, cliente.index);
router.get("/clienteilterId/:id", verificacao, cliente.filterId)
router.put("/clientePut/:id", verificacao, cliente.update);
router.delete("/cliente/:id", verificacao, cliente.delete);