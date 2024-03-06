const { Router } = require('express')
const router = new Router()
const negociacao = require('../controllers/negociacaoController')
const verificacao = require('../requireAuth');

router.post('/negociacao', verificacao, negociacao.create)
router.get('/negociacao', verificacao, negociacao.index)
router.get('/filterIdnegociacao/:id', verificacao, negociacao.filterId)
router.put('/negociacaoPut/:id', verificacao, negociacao.update)
router.delete('/negociacao/:id', verificacao, negociacao.delete)


module.exports = router