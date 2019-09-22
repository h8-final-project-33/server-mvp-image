const { getPublicUrl, sendUploadToGCS, convertBs64 } = require('./gcsImage.js')
const { quickstart, getLabel }                            = require('./gvisionImage')

module.exports = {
    getPublicUrl,
    sendUploadToGCS,
    convertBs64,
    quickstart,
    getLabel

}