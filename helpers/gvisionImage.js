const GOOGLE_APPLICATION_CREDENTIALS = process.env.KEYFILE_PATH

function quickstart(featured_image) {
    const vision = require('@google-cloud/vision')
    const client = new vision.ImageAnnotatorClient()
    
    return client.labelDetection(featured_image)
    .then(([result]) => {
        const labels = result.labelAnnotations
        console.log(labels);
        if (!labels) {
            console.log(`Nothing results`)
            return null
        }
        else {
            let description = []
            labels.forEach(label => {
                description.push(label.description)
            })
            return description
        }
    })
}

module.exports = { quickstart }