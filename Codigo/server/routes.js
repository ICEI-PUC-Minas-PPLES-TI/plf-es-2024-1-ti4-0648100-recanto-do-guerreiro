const { Router } = require('express')
const router = new Router()
const reservasRoutes = require('./routes/reservasRoutes')
const userRoutes = require('./routes/userRoutes')
const authRoute = require('./routes/authRoute')

router.use(reservasRoutes, userRoutes, authRoute)

module.exports = router