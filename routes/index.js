const router = require('express').Router()
const ImageController = require('../controllers')
const { multer, sendUploadToGCS } = require('../helpers')

router.get('/', ImageController.findAll)
router.get('/:id', ImageController.findOne)
router.post('/', multer.single('image'), sendUploadToGCS, ImageController.create)
router.patch('/:id',  multer.single('image'), sendUploadToGCS, ImageController.update)
router.delete('/:id', ImageController.delete)

module.exports = router