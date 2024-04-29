const { Router } = require("express");
const router = new Router();
const reserva = require("../controllers/reservaController");
const verificacao = require("../requireAuth");

router.post("/reserva", verificacao, async (req, res) => {
  const { data } = req.body;
  const dataJaReservada = await reserva.verificarDataExistente(data);
  if (dataJaReservada) {
    return res.status(400).json({ mensagem: "Essa data já foi reservada." });
  }
  reserva.create(req, res);
});
router.get("/reserva", verificacao, reserva.index);
router.get("/filterIdReserva/:id", verificacao, reserva.filterIdReserva);
router.put("/reservaPut/:id", verificacao, async (req, res) => {
  const reservaid = req.params.id;
  const { data } = req.body;
  const dataJaReservada = await reserva.verificarDataExistente(data, reservaid);
  if (dataJaReservada) {
    return res.status(400).json({ mensagem: "Essa data já foi reservada." });
  }
  reserva.update(req, res);
});
router.put("/reservaStatus/:id", verificacao, reserva.updateStatus);
router.delete("/reserva/:id", verificacao, reserva.delete);

// Rota para verificar se uma data de reserva já existe
router.get("/verificarData", verificacao, reserva.verificarData);

module.exports = router;
