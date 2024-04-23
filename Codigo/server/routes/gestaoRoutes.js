const { Router } = require("express");
const router = new Router();
const gestao = require("../controllers/gestaoController");
//const verificacao = require('../requireAuth'); COLOCAR DEPOIS NAS ROTAS E TIRAR O COMENTARIO
// Defina suas rotas
router.get("/", (req, res) => {
  res.send("Bem-vindo ao Recanto do Guerreiro!");
});
router.post("/gestao", gestao.create);
router.get("/gestao", gestao.index);
router.put("/gestaoPut/:id", gestao.update);
router.delete("/gestao/:id", gestao.delete);

module.exports = router;
