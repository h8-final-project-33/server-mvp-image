const Image = require('../models')

module.exports = {
    clearImage (done) {
        if (process.env.NODE_ENV == 'test') {
            Image.deleteMany({})
            .then(() => {
                console.log('done')
                done()
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
}