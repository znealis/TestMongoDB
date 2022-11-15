const {MongoClient} = require('mongodb');


async function connect() {

    const uri = "mongodb+srv://AdminUser:Asd123asd@capstoneproject.xbu68gm.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);

    const db = client.db("test");
    const coll = db.collection("newdata");
    

    try {

        console.log(" # Connecting to database server ...");
        await client.connect();
        console.log("# Connected");
        await listDatabases(client);
        const db = client.db("test");
        const coll = db.collection("newdata");
        const artistExample = coll.aggregate([{ $unwind: '$results'},
                                                {$match: {'results.artistName' : 'Hannah Montana'}},
                                                {$project: {'_id': 0, 'results.artistName': 1, 'results.trackName': 1,}}]);

        const searchBySong = coll.aggregate([{$unwind: '$topCharts.data'},
                                                {$match: {'topCharts.data.title' : "God's Plan"}},
                                                {$group: {'_id': null, 'songDetails': {$push:{
                                                    'title': '$topCharts.data.title',
                                                    'artist': '$topCharts.data.artist.name',
                                                    'album': '$topCharts.data.album.title',
                                                    'albumCover': '$topCharts.data.album.cover',
                                                    'preview': '$topCharts.data.preview', 
                                                    'Link': '$topCharts.data.link',
                                                    'mediumPicture': '$topCharts.data.artist.picture_medium'}}
                                                }},
                                                {$project:{
                                                    'songDetails' : 1,
                                                    '_id': 0,
                                                }}
                                            ]);
     


        await artistExample.forEach(console.log);
        console.log("Example 1");
        await searchBySong.forEach(console.log);



    }
    catch(err){

        console.error("# Database connection error", err);
    }
    finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }

}

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

connect().catch(console.dir);
