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
    if (!req.file) {
        return next()
    }

    const gcsname = `upload/${Date.now()}`
    const file = bucket.file(gcsname)
    var imageBuffer = req.file.buffer
    file.save(imageBuffer, {
        metadata: { contentType: 'image/jpg' },
        public: true,
        validation: 'md5'
    }, function(error) {
        if (error) {
            next(error)
        }
        req.file.cloudStoragePublicUrl = getPublicUrl(gcsname)
        next()
    })
    // const stream = file.createWriteStream({
    //     metadata: {
    //         contentType: 'image/jpg'
    //     }
    // })

    // stream.on('error', (err) => {
    //     req.file.cloudStorageError = err
    //     next(err)
    // })

    // stream.on('finish', () => {
    //     req.file.cloudStorageObject = gcsname
    //     file.makePublic().then(() => {
    //         req.file.cloudStoragePublicUrl = getPublicUrl(gcsname)
    //         next()
    //     })
    // })

    // stream.end(req.file.buffer)
}

// const Multer = require('multer')

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

