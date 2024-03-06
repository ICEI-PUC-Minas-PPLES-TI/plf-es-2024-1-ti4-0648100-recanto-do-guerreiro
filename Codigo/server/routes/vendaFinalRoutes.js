const { Router } = require('express')
const router = new Router()
const venda = require('../controllers/vendaFinalController')
const verificacao = require('../requireAuth');

router.post('/venda', verificacao, venda.create)
router.get('/venda', verificacao, venda.index)
router.get('/filterVendaC/:carroId', verificacao, venda.getOne)
router.put('/vendaPut/:id', verificacao, venda.update)
router.delete('/venda/:id', verificacao, venda.delete)


module.exports = router