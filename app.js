require('dotenv').config()

const express       = require('express')
const app           = express()
const cors          = require('cors')
const morgan        = require('morgan')
const PORT          = process.env.PORT || 3001
const routes        = require('./routes')
const mongoose      = require('mongoose')
// const DB            = process.env.DB_ATLAS
const DB_LOCAL      = process.env.DB_LOCAL

mongoose.connect(DB_LOCAL, { useNewUrlParser : true, useUnifiedTopology: true })
.then(() => {
    console.log(`Connect to mongoose database`)
})
.catch(err => {
    console.log(err)
})
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', routes)

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})
