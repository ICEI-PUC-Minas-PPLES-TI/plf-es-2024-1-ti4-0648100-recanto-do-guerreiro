const { Router } = require('express')
const router = new Router()
const compra = require('../controllers/compraController')
const verificacao = require('../requireAuth');

router.post('/compraCarro', compra.create)
router.get('/compra/:id', verificacao, compra.read)
router.delete('/compra/:id', verificacao, compra.delete)

module.exports = router