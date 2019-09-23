const Image             = require('../models')
const { quickstart, getLabel }    = require('../helpers')

class ImageController {
    static findAll (req, res, next) {
        Image.find({})
        .sort({ created_at: -1 })
        .then(images => {
            res.status(200).json(images)
        })
        .catch(next)
    }

    static findMine (req, res, next) {
        Image.find({owner: req.body.owner})
        .sort({ created_at: -1 })
        .then(images => {
            res.status(200).json(images)
        })
        .catch(next)
    }

    static findOne(req, res, next) {
        Image.findOne({
            _id: req.params.id
        })
        .then(image => {
            if (image) {
                res.status(200).json(image)
            }
            else {
                next({
                    code: 404,
                    message: `Image not found`
                })
            }
        })
        .catch(next)
    }

    static async create (req, res, next) {
        const data = await quickstart(req.file.cloudStoragePublicUrl)
        const label = await getLabel(req.file.cloudStoragePublicUrl)
        const obj = {
            owner: req.body._id,
            featured_image: req.file.cloudStoragePublicUrl,
            description: data,
            label,
            coordinate: data.coordinate
        }
        Image.create(obj)
        .then(newImage => {
            res.status(201).json(newImage)
        })
        .catch(next)
    }

    static delete (req, res, next) {
        Image.deleteOne({
            _id: req.params.id,
        })
        .then(result => {
            if (result.n && result.ok) {
                res.status(200).json({
                    message: `Image deleted`
                })
            }
            else {
                next({
                    code: 404,
                    message: `Image not found`
                })
            }
        })
        .catch(next)
    }
}

module.exports = ImageController