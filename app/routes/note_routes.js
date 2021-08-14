'use strict'

const ObjectID = require('mongodb').ObjectId

module.exports = function (app, database) {

    app.get('/notes/:id', (req, res) => {
        const id = req.params.id
        const details = { '_id': new ObjectID(id) }
        database.collection('notes').findOne(details, (err, item) => {
            if (err) {
                return res.status(500).json({ 'error': 'An error has occured' })
            }
            res.status(200).json(item)
        })
    })

    app.post('/notes', (req, res) => {
        const note = { text: req.body.body, title: req.body.title }
        database.collection('notes').insert(note, (err, result) => {
            if (err) {
                res.status(500).json({ 'error': 'An error has occured' })
            } else {
                res.status(201).json({ 'message': 'Success' })
            }
        })
    })


    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id
        const details = { '_id': new ObjectID(id) }
        database.collection('notes').remove(details, (err, item) => {
            if (err) {
                res.status(500).json({ 'error': 'An error has occured' })
                return
            }
            res.status(200).json({ 'message': 'Successfuly delete: ' + id })
        })
    })

    app.put('/notes/:id', (req, res) => {
        const id = req.params.id
        const details = { '_id': new ObjectID(id) }
        const note = { 'text': req.body.body, 'title': req.body.title }
        database.collection('notes').updateOne(details, { $set: note }, (err, item) => {
            if (err) {
                res.status(500).json({ 'error': 'An error has occured' })
                return
            }
            res.status(200).json({ 'message': 'Successfuly update: ' + id })
        })
    })
}