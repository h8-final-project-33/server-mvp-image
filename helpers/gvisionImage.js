const GOOGLE_APPLICATION_CREDENTIALS = process.env.KEYFILE_PATH

function quickstart(featured_image) {
    const vision = require('@google-cloud/vision')
    const client = new vision.ImageAnnotatorClient()

    return client.objectLocalization(featured_image)
    .then(([result]) => {
        let ObjectDetected = []
        const objects = result.localizedObjectAnnotations
        objects.forEach(object => {
            let obj = {
                name : object.name,
                coordinates : []
            }
            object.boundingPoly.normalizedVertices.forEach((v, index) => {
                obj.coordinates[index]=({x: v.x, y:v.y})
            })
          
            ObjectDetected.push(obj)
          });
        return ObjectDetected
    })
}


function getLabel(featured_image) {
    const vision = require('@google-cloud/vision')
    const client = new vision.ImageAnnotatorClient()
    return client.labelDetection(featured_image)
    .then(([result]) => {
        let arrLabel = []
        const labels = result.labelAnnotations;
        labels.forEach((label,index) => {
          arrLabel[index]=(label.description)
        });
        return arrLabel
    })
}

module.exports = { quickstart, getLabel }