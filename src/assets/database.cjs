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
        const artistExample = coll.aggregate([{$unwind: '$topCharts1.tracks.hits'},
                                            {$match: {'topCharts1.tracks.hits.track.type' : "MUSIC"}},
                                        {$group: {'_id': null, 'songDetails': {$push:{'artist': '$topCharts1.tracks.hits.track.subtitle'}}}},
                                        {$project:{
                                            'songDetails' : 1,
                                            '_id': 0,
    }}]);

    
     


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
