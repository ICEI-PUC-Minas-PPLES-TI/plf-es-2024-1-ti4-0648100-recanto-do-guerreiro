const { Router } = require('express')
const router = new Router()
const carroRoutes = require('./routes/carroRoutes')
const oficinaRoutes = require('./routes/oficinaRoutes')
const manutencaoRoutes = require('./routes/manutencaoRoutes')
const checklistRoutes = require('./routes/checklistRoute')
const negociacaoRoutes = require('./routes/negociacaoRoutes')
const compraRoutes = require('./routes/compraRoutes')
const vendaFinalRoutes = require('./routes/vendaFinalRoutes')
const userRoutes = require('./routes/userRoutes')
const authRoute = require('./routes/authRoute')

router.use(carroRoutes, oficinaRoutes, manutencaoRoutes, negociacaoRoutes, checklistRoutes, compraRoutes, vendaFinalRoutes, userRoutes, authRoute)

module.exports = router