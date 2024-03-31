const { Router } = require('express')
const router = new Router()
const reservasRoutes = require('./routes/reservasRoutes')
const clienteRoutes = require('./routes/clienteRoutes')
const usuarioRoutes = require('./routes/usuarioRoutes')
const userRoutes = require('./routes/userRoutes')
const authRoute = require('./routes/authRoute')

router.use(reservasRoutes, clienteRoutes, usuarioRoutes, userRoutes, authRoute)

module.exports = router