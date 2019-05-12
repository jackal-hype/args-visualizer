const mongoose = require('mongoose')
const argument = require('./argument').schema

const issueSchema = mongoose.Schema({
        title: { type: String, trim: true, maxlength: 140, minlength: 5 },
        problem: { type: String, trim: true, maxlength: 140 },
        pros: { type: [ argument ], default: [] },
        cons: { type: [ argument ], default: [] },
    },
    { timestamps: true }
)

issueSchema.pre('findOneAndUpdate', function (next) {
    this.options.runValidators = true
    this.options.setDefaultsOnInsert = true
    // this.options.upsert = true,
    // this.options.new = true,
    next()
})

module.exports = mongoose.model('Issue', issueSchema)
