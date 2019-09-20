const { getPublicUrl, sendUploadToGCS, multer } = require('./gcsImage.js')
const { quickstart }                            = require('./gvisionImage')

module.exports = {
    getPublicUrl,
    sendUploadToGCS,
    multer,
    quickstart
}