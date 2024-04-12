const { Router } = require('express')
const router = new Router();
const gestao = require("../controllers/gestaoController");
const verificacao = require('../requireAuth');

router.post("/gestao", verificacao, gestao.create);
router.get("/gestao", verificacao, gestao.index);
router.put("/gestaoPut/:id", verificacao, gestao.update);
router.delete("/gestao/:id", verificacao, gestao.delete);

module.exports = router