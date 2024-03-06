const express = require("express");
const router = express.Router();
const oficina = require("../controllers/manutencaoController");
const relatorioController = require('../controllers/relatorioController');
const verificacao = require('../requireAuth');

router.post("/manutencao", verificacao, oficina.create);
router.get("/manutencao", verificacao, oficina.index);
router.get('/filterId', verificacao, oficina.filterId);
router.get('/manutencaoFilCarro', verificacao, oficina.manutencaoFilCarro);
router.get('/manutencaoFilOficina', verificacao, oficina.manutencaoFilOficina);
router.get("/manutencao/:id", verificacao, relatorioController.getById);
router.put("/manutencaoPut/:id", verificacao, oficina.update);
router.delete("/manutencao/:id", verificacao, oficina.delete);

module.exports = router;