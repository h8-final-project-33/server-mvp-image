const { Storage } = require('@google-cloud/storage')

const CLOUD_BUCKET = process.env.CLOUD_BUCKET


const storage = new Storage({
    projectId: process.env.GCLOUD_PROJECT,
    keyFilename: process.env.KEYFILE_PATH
})

const bucket = storage.bucket(CLOUD_BUCKET)

const getPublicUrl = (filename) => {
    return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`
}

const sendUploadToGCS = (req, res, next) => {
    const gcsname = `upload/${Date.now()}`
    const file = bucket.file(gcsname)
    var imageBuffer = req.file.buffer
    file.save(imageBuffer, {
        metadata: { contentType: 'image/jpg' },
        public: true,
        validation: 'md5'
    }, function() {
        req.file.cloudStoragePublicUrl = getPublicUrl(gcsname)
        next()
    })
}


const convertBs64 = async (req, res, next) => {
    var stream = require('stream');
    var bufferStream = new stream.PassThrough();
    bufferStream.end(Buffer.from(req.body.image, 'base64'));
    req.file = {}

    req.file.buffer = await Buffer.from(req.body.image, 'base64'); // Ta-da

    console.log(req.file.buffer);
    next()
}


module.exports = {
    getPublicUrl,
    sendUploadToGCS,
    convertBs64
}

