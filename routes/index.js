const router = require('express').Router()
const ImageController = require('../controllers')
const {convertBs64, sendUploadToGCS } = require('../helpers')

router.get('/', ImageController.findAll)
router.get('/:id', ImageController.findOne)
router.post('/',convertBs64, sendUploadToGCS, ImageController.create)
router.patch('/:id', convertBs64, sendUploadToGCS, ImageController.update)
router.delete('/:id', ImageController.delete)

module.exports = router