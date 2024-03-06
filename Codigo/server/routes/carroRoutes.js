const { Router } = require('express')
const router = new Router()

const multer = require('multer')
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'imgs');
    },
    filename: function(req, file, cb){
        let data = new Date().toISOString().replace(/:/g, '-') + '-';
        cb(null, data + file.originalname );
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

const carro = require('../controllers/carroController')
const verificacao = require('../requireAuth')

router.post('/carro', verificacao, upload.single('imagem'), carro.create)
router.get('/carro', carro.index)
router.get('/filterIdCarro/:id', carro.filterIdCarro)
router.put('/carroPut/:id', verificacao, carro.update)
router.put('/carroStatus/:id', verificacao, carro.updateStatus)
router.delete('/carro/:id', verificacao, carro.delete)
router.get('/carroShort', verificacao, carro.getNomeImg)

module.exports = router