const { Router } = require('express')
const router = new Router();
const reserva = require('../controllers/reservaController')
    //const verificacao = require('../requireAuth')

router.post('/reserva', verificacao, reserva.create)
router.get('/reserva', reserva.index)
router.get('/filterIdReserva/:id', reserva.filterIdReserva)
router.put('/reservaPut/:id', verificacao, reserva.update)
router.put('/reservaStatus/:id', verificacao, reserva.updateStatus)
router.delete('/reserva/:id', verificacao, reserva.delete)

module.exports = router