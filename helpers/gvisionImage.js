const GOOGLE_APPLICATION_CREDENTIALS = process.env.KEYFILE_PATH

function quickstart(featured_image) {
    const vision = require('@google-cloud/vision')
    const client = new vision.ImageAnnotatorClient()

    return client.objectLocalization(featured_image)
    .then(([result]) => {
        let ObjectDetected = []
        const objects = result.localizedObjectAnnotations
        objects.forEach(object => {
            let obj = {}
            obj.name = object.name
            console.log(obj.name);
            obj.coordinates = []
            const vertices = object.boundingPoly.normalizedVertices
            vertices.forEach(v => {
                obj.coordinates.push({x: v.x, y:v.y})
                console.log(`x: ${v.x}, y:${v.y}`)
            })
	    if (object.score > 0.6) {
            	ObjectDetected.push(obj)
	     }
            console.log(ObjectDetected);
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
        labels.forEach(label => {
	console.log(label.description, label.score)
	if (label.score > 0.6){
          arrLabel.push(label.description)
	}
        });
        return arrLabel
    })
}

module.exports = { quickstart, getLabel }
