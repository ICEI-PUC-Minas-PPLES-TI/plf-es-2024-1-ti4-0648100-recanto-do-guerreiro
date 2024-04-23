const { Router } = require("express");
const router = new Router();
const cliente = require("../controllers/clienteController");
//const verificacao = require("../requireAuth"); DEPOIS COLOCAR NAS ROTAS

// Defina suas rotas
router.get("/", (req, res) => {
  res.send("Bem-vindo ao Recanto do Guerreiro!");
});

router.post("/cliente", cliente.create);
router.get("/cliente", cliente.index);
router.get("/clienteilterId/:id", cliente.filterIdCliente);
router.put("/clientePut/:id", cliente.update);
router.delete("/cliente/:id", cliente.delete);

module.exports = router;
