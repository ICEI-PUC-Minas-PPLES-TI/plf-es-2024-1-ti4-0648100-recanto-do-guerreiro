const { Router } = require('express')
const router = new Router();
const cliente = require("../controllers/clienteController");
const verificacao = require('../requireAuth');

router.post("/cliente", verificacao, cliente.create);
router.get("/oficina", verificacao, cliente.index);
router.get("/clienteilterId/:id", verificacao, cliente.filterIdCliente)
router.put("/clientePut/:id", verificacao, cliente.update);
router.delete("/cliente/:id", verificacao, cliente.delete);

module.exports = router