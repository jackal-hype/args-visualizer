if (process.env.NODE_ENV !== 'production') {
    const dotenv = require('dotenv')
    // console.log("dotenv: ", dotenv)
    dotenv.config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const indexRouter = require('./routes/index')
const issuesRouter = require('./routes/api/issues')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

// MongoDB
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
const db = mongoose.connection
db.on('error', error => console.error(error) )
db.once('open', () => console.log('connected to Mongoose') )
app.set('db', db)

// Routes
app.use('/', indexRouter)
app.use('/api/v1/issues', issuesRouter)

// common errors handler
app.use(function (err, req, res, next) {
    console.error(err)
    res.status(500).json({ error: err })
})

app.listen(process.env.PORT || 3000)
