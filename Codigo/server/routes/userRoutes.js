const { Router } = require('express')
const router = new Router()
const user = require('../controllers/UserController')
// Defina suas rotas
router.get("/", (req, res) => {
    res.send("Bem-vindo ao Recanto do Guerreiro!");
  });
router.post('/user', user.create)
router.get('/user', user.index)

module.exports = router