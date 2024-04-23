const { Router } = require("express");
const router = new Router();
const reserva = require("../controllers/reservaController");
const verificacao = require("../requireAuth");
// Defina suas rotas
router.get("/", (req, res) => {
  res.send("Bem-vindo ao Recanto do Guerreiro!");
});
router.post("/reserva", verificacao, reserva.create);
router.get("/reserva", verificacao, reserva.index);
router.get("/filterIdReserva/:id", verificacao, reserva.filterIdReserva);
router.put("/reservaPut/:id", verificacao, reserva.update);
router.put("/reservaStatus/:id", verificacao, reserva.updateStatus);
router.delete("/reserva/:id", verificacao, reserva.delete);

module.exports = router;
