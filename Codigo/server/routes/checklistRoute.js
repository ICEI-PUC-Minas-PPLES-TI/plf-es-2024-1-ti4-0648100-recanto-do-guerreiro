const { Router } = require('express')
const router = new Router()
const checklist = require('../controllers/checklistController')
const verificacao = require('../requireAuth')

router.post('/checklist', verificacao, checklist.create)
router.get('/checklist/:id', verificacao, checklist.read)
router.put('/checklist/:id', verificacao, checklist.update)
router.delete('/checklist/:id', verificacao, checklist.delete)
router.delete('/checklistCar/:id', verificacao, checklist.deleteCar)

module.exports = router