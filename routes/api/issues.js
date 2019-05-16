const express = require('express')
const router = express.Router()
const util = require('util')
const baseUri = ''
const IssueModel = require('../../models/issue')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

router.get(baseUri + '/:id', (req, res) => {
    const id = req.params.id
    IssueModel.findById(id).exec()
        .then(doc => {
            res.status(200).json({issue: doc})
        })
        .catch(err => {
            res.status(400).json({error: `Issue not found: ${id}`})
        })
})

router.get(baseUri + '/', (req, res) => {
    IssueModel.find().sort({updatedAt: -1}).limit(10).exec()
        .then(docs => {
            res.status(200).json(docs)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: err})
        })
})

router.put(baseUri + '/', jsonParser, (req, res, next) => {
    const db = req.app.get('db')
    let issue = req.body.issue
    IssueModel(issue).save().then(result => {
        console.log('_id: ', result._id)
        res.send('put issue ok')
    }).catch(err => {
        next(err)
    })
})

router.patch(baseUri + '/:id', jsonParser, (req, res) => {
    let id = req.params.id
    let issue = req.body.issue
    if (!issue.cons) {
        issue.cons = []
    }
    if (!issue.pros) {
        issue.pros = []
    }
    IssueModel.findOneAndUpdate( { _id: id }, issue)
        .exec()
        .then(doc => {
            res.status(200).json({ok: true})
        })
        .catch(err => {
            res.status(400).json({error: `Unable to patch ${id}`})
        })
})

router.delete(baseUri + '/:id', (req, res) => {
    let id = req.params.id
    IssueModel.findByIdAndRemove(id)
        .then(() => {
            res.status(200).json({ok: true})
        })
        .catch(err => {
            res.status(400).json({error: 'unable to remove'})
        })
})

module.exports = router