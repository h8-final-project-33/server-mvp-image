const mongoose = require('mongoose')
const { Schema } = mongoose

const ImageSchema = new Schema({
    featured_image: String,
    description: [{
        type: String
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

const Image = mongoose.model('Image', ImageSchema)

module.exports = Image