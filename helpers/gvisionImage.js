const GOOGLE_APPLICATION_CREDENTIALS = process.env.KEYFILE_PATH

function quickstart(featured_image) {
    const vision = require('@google-cloud/vision')
    const client = new vision.ImageAnnotatorClient()
    
    client.labelDetection(featured_image)
    .then(([result]) => {
        const labels = result.labelAnnotations
        if (!labels) {
            console.log(`Nothing results`)
        }
        else {
            let description = []
            labels.forEach(label => {
                description.push(label.description)
            })
            return description
        }
    })
    .catch(err => {
        console.log(err)
    })
}

module.exports = { quickstart }