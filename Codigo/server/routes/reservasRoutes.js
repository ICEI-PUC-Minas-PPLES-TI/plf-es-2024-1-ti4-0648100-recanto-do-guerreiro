const { Router } = require("express");
const router = new Router();
const reserva = require("../controllers/reservaController");
//const verificacao = require('../requireAuth')
// Defina suas rotas
router.get("/", (req, res) => {
  res.send("Bem-vindo ao Recanto do Guerreiro!");
});
router.post("/reserva", reserva.create);
router.get("/reserva", reserva.index);
router.get("/filterIdReserva/:id", reserva.filterIdReserva);
router.put("/reservaPut/:id", reserva.update);
router.put("/reservaStatus/:id", reserva.updateStatus);
router.delete("/reserva/:id", reserva.delete);

module.exports = router;
