const { getPublicUrl, sendUploadToGCS, convertBs64 } = require('./gcsImage.js')
const { quickstart }                            = require('./gvisionImage')

module.exports = {
    getPublicUrl,
    sendUploadToGCS,
    convertBs64,
    quickstart
}