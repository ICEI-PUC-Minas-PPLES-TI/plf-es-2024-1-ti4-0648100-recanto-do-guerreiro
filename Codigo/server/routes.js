const { Router } = require('express')
const router = new Router()
const reservasRoutes = require('./routes/reservasRoutes')
const clienteRoutes = require('./routes/clienteRoutes')
const userRoutes = require('./routes/userRoutes')
const authRoute = require('./routes/authRoute')
const gestaoRoutes = require('./routes/gestaoRoutes')

router.use(reservasRoutes, clienteRoutes, userRoutes, authRoute, gestaoRoutes)

module.exports = router