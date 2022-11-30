const MongoClient = require('mongodb').MongoClient
const unwind = require('javascript-unwind');
const express = require('express');
const app = express();
const fs = require('fs');


const uri = "mongodb+srv://AdminUser:Asd123asd@capstoneproject.xbu68gm.mongodb.net/?retryWrites=true&w=majority";

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


        app.get('/nicole.ejs', (req, res) => {
            res.render('nicole.ejs')
        })
            app.get('/john.ejs', (req, res) => {
                res.render('john.ejs')
            })
                app.get('/zach.ejs', (req, res) => {
                    db.collection('newdata').aggregate([{$unwind: '$topCharts.data'},
                    {$match: {'topCharts.data.readable' : true}},
                    {$group: {'_id': null, 'songDetails': {$push:{
                        'title': '$topCharts.data.title',
                        'artist': '$topCharts.data.artist.name',
                        'album': '$topCharts.data.album.title',
                        'albumCover': '$topCharts.data.album.cover_medium',
                        'preview': '$topCharts.data.preview', 
                        'Link': '$topCharts.data.link',
                        'mediumPicture': '$topCharts.data.artist.picture_medium'}}
                    }},
                    {$project:{
                        'songDetails' : 1,
                        '_id': 0,
                    }}]).toArray()
        
                    .then(results => {
                        console.log(unwind(results, 'songDetails'))
                        res.render('zach.ejs', {results: unwind(results, 'songDetails')})
                    })
                })

                app.get('/christina.ejs', (req, res) => {
                    db.collection('newdata').aggregate([{ $unwind: '$topCharts1'},
                    {$match: {'topCharts1.tracks.hits.track.subtitle' : 'Drake'}},
                    {$group: {'_id': null, 'songData': {$push: {'artist': '$topCharts.tracks.hits.track.subtitle', 'track': '$topCharts1.tracks.hits.track.title'}}}},
                    {$project: {'_id': 0, 'songData': 1}}]).toArray()
        
        
                    .then(results => {
                        console.log(unwind(results, 'songData'))
                        res.render('christina.ejs', {results: unwind(results, 'songData')})
                    })
                })
               

    app.listen(5000, function(){
        console.log('listening on 5000')
    })
})

