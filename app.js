require('dotenv').config()

const express       = require('express')
const app           = express()
const cors          = require('cors')
const morgan        = require('morgan')
const PORT          = process.env.PORT
const routes        = require('./routes')
const mongoose      = require('mongoose')
const db = `mongodb://mromiario:${process.env.MONGO_PASSWORD}@cluster0-shard-00-00-qjyss.mongodb.net:27017,cluster0-shard-00-01-qjyss.mongodb.net:27017,cluster0-shard-00-02-qjyss.mongodb.net:27017/testFinalProject?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`

mongoose.connect(db, { useNewUrlParser : true, useUnifiedTopology: true })
.then(() => {
    console.log(`Connect to mongoose database`)
})

app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({ limit: '50mb', extended: false }))
app.use(express.json({ limit: '50mb' }))

app.use('/images', routes)

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})

module.exports = app