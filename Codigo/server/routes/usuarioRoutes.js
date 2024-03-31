const { Router } = require('express')
const router = new Router();
const cliente = require("../controllers/usuarioController");
const verificacao = require('../requireAuth');

router.post("/usuario", verificacao, cliente.create);

module.exports = router