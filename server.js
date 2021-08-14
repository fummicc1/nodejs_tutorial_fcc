'use strict'

const express = require('express')
const MongoClient = require('mongodb').MongoClient
const database = require('./config/db')

const app = express()

const port = 8000

app.use(express.urlencoded({ extended: true }))

MongoClient.connect(database.url, (err, client) => {
    if (err) {
        return console.error(err)
    }
    require('./app/routes')(app, client.db('myFirstDatabase'))

    app.listen(port, () => {
        console.log('We are live on ' + port)
    })
})