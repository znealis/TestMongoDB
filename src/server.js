const MongoClient = require('mongodb').MongoClient
const unwind = require('javascript-unwind');
const express = require('express');
const app = express();
const fs = require('fs');


const uri = "mongodb+srv://AdminUser:Asd123asd@capstoneproject.xbu68gm.mongodb.net/?retryWrites=true&w=majority";
let storeData = [];
MongoClient.connect(uri, { useUnifiedTopology: true})
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('test')

        app.set('view ejs', 'ejs')

        app.get('/', (req, res) => {
            db.collection('newdata').aggregate([{ $unwind: '$results'},
            {$match: {'results.artistName' : 'Hannah Montana'}},
            {$group: {'_id': null, 'songs': {$push: {'artist': '$results.artistName', 'track': '$results.trackName'}}}},
            {$project: {'_id': 0, 'songs': 1}}]).toArray()

            .then(results => {
                console.log(unwind(results, 'songs'))
                res.render('index.ejs', {results: unwind(results, 'songs')})
            })      
         })

    app.get('/christina', (req, res) => {
        db.collection('newdata').aggregate([{ $unwind: '$results'},
        {$match: {'results.artistName' : 'Drake'}},
        {$group: {'_id': null, 'songs': {$push: {'artist': '$results.artistName', 'track': '$results.trackName'}}}},
        {$project: {'_id': 0, 'songs': 1}}]).toArray()

        .then(results => {
            console.log(unwind(results, 'songs'))
            res.render('christina.ejs', {results: unwind(results, 'songs')})
        })
    })
        app.get('/nicole', (req, res) => {
            db.collection('newdata').aggregate([{ $unwind: '$results'},
            {$match: {'results.artistName' : 'Daft Punk'}},
            {$group: {'_id': null, 'songs': {$push: {'artist': '$results.artistName', 'track': '$results.trackName'}}}},
            {$project: {'_id': 0, 'songs': 1}}]).toArray()

            .then(results => {
                console.log(unwind(results, 'songs'))
                res.render('nicole.ejs', {results: unwind(results, 'songs')})
            })
        })
            app.get('/john', (req, res) => {
                db.collection('newdata').aggregate([{ $unwind: '$results'},
                {$match: {'results.artistName' : 'Avenged'}},
                {$group: {'_id': null, 'songs': {$push: {'artist': '$results.artistName', 'track': '$results.trackName'}}}},
                {$project: {'_id': 0, 'songs': 1}}]).toArray()
    
                .then(results => {
                    console.log(unwind(results, 'songs'))
                    res.render('john.ejs', {results: unwind(results, 'songs')})
                })
            })
                app.get('/zach', (req, res) => {
                    db.collection('newdata').aggregate([{ $unwind: '$results'},
                    {$match: {'results.artistName' : 'Hannah Montana'}},
                    {$group: {'_id': null, 'songs': {$push: {'artist': '$results.artistName', 'track': '$results.trackName'}}}},
                    {$project: {'_id': 0, 'songs': 1}}]).toArray()
        
                    .then(results => {
                        console.log(unwind(results, 'songs'))
                        res.render('zach.ejs', {results: unwind(results, 'songs')})
                    })
                })




    app.listen(5000, function(){
        console.log('listening on 5000')
    })
})

