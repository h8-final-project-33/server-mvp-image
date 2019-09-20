const Image             = require('../models')
const { quickstart }    = require('../helpers')

class ImageController {
    static findAll (req, res, next) {
        Image.find({})
        .sort({ created_at: -1 })
        // .populate('owner')
        .then(images => {
            res.status(200).json(images)
        })
        .catch(next)
    }

    static findOne(req, res, next) {
        Image.findOne({
            _id: req.params.id
        })
        // .populate('owner')
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

    static create (req, res, next) {
        const obj = {
            owner: req.authenticatedUser._id,
            featured_image: req.file.cloudStoragePublicUrl,
            description: quickstart(req.file.cloudStoragePublicUrl)
        }
        Image.create(obj)
        .then(newImage => {
            res.status(201).json(newImage)
        })
        .catch(next)
    }

    static update (req, res, next) {
        let featured_image = req.file.cloudStoragePublicUrl
        req.body.featured_image = featured_image
        req.body.description = quickstart(featured_image)
        Image.updateOne({
            _id: req.params.id
        }, {
            $set: req.body
        })
        .then(result => {
            if (result.n && result.ok) {
                res.status(200).json({
                    message: 'Image updated'
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