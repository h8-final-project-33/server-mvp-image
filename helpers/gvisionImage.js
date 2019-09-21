const GOOGLE_APPLICATION_CREDENTIALS = process.env.KEYFILE_PATH

function quickstart(featured_image) {
    const vision = require('@google-cloud/vision')
    const client = new vision.ImageAnnotatorClient()

    return client.labelDetection(featured_image)
    .then(([result]) => {
        const obj = {
            description =[],
            coordinate =[]
        }
        const labels = result.labelAnnotations
        const coordinates = result.cropHintsAnnotation.cropHints
        if (!labels || !coordinates || !labels && !coordinates) {
            console.log(`Nothing results`)
            return null
        }
        else if (labels || coordinates || labels && coordinates) {
            labels.forEach(label => {
                obj.description.push(label.description)
            })
            coordinates.forEach(coord => {
                obj.coordinate.push(coord.boundingPoly.vertices)
            })
            return obj
        }
    })
}

module.exports = { quickstart }