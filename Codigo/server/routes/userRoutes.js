const { Router } = require('express')
const router = new Router()
const user = require('../controllers/UserController')

router.post('/user', user.create)
router.get('/user', user.index)

module.exports = router