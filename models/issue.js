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

module.exports = mongoose.model('Issue', issueSchema)
