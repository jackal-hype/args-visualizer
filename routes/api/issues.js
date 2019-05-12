const express = require('express')
const router = express.Router()
const util = require('util')
const baseUri = ''
const IssueModel = require('../../models/issue')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

router.get(baseUri + '/:id', (req, res) => {
    // console.log(req.query, req.path, req.baseUrl)
    // res.send('<pre>' + util.inspect(req));    
    const db = req.app.get('db')
    const id = req.params.id    
    res.send()
}) 

router.get(baseUri + '/', (req, res) => {    
    // const db = req.app.get('db')
    IssueModel.find().exec()
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

router.patch(baseUri + '/:id', (req, res) => {

}) 

router.delete(baseUri + '/issues/:id', (req, res) => {
    // const issues = loadIssuesCollection()
    // issues.deleteOne({_id: new mongodb.ObjectID(req.params.id)})
})

module.exports = router