const { Router } = require('express')
const router = new Router()

const multer = require('multer')
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'imgs');
    },
    filename: function(req, file, cb) {
        let data = new Date().toISOString().replace(/:/g, '-') + '-';
        cb(null, data + file.originalname);
    }
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}
const upload = multer({ storage: storage, fileFilter: fileFilter })

const reserva = require('../controllers/reservaController')
const verificacao = require('../requireAuth')

router.post('/reserva', verificacao, upload.single('imagem'), reserva.create)
router.get('/reserva', reserva.index)
router.get('/filterIdReserva/:id', reserva.filterIdReserva)
router.put('/reservaPut/:id', verificacao, reserva.update)
router.put('/reservaStatus/:id', verificacao, reserva.updateStatus)
router.delete('/reserva/:id', verificacao, reserva.delete)
router.get('/reservaShort', verificacao, reserva.getNomeImg)

module.exports = router