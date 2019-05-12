const mongoose = require('mongoose')

const argumentSchema = mongoose.Schema({
    title: { type: String, required: true, trim: true, maxlength: 140 },
    fontSize: { type: Number, default: 16, min: 6, max: 64 }
})

module.exports = mongoose.model('Argument', argumentSchema)
