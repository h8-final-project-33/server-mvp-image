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

    static async create (req, res, next) {
        console.log('di contrrrr',req.file);
        const data = await quickstart(req.file.cloudStoragePublicUrl)
        const obj = {
            //owner: req.authenticatedUser._id,
            featured_image: req.file.cloudStoragePublicUrl,
            description: data,
            coordinate: data.coordinate
        }
        Image.create(obj)
        .then(newImage => {
            res.status(201).json(newImage)
        })
        .catch(next)
    }

    static async update (req, res, next) {
        const data = await quickstart(req.file.cloudStoragePublicUrl)
        let featured_image = req.file.cloudStoragePublicUrl
        req.body.featured_image = featured_image
        req.body.description = data.description
        req.body.coordinate = data.coordinate
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