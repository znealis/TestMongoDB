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
        const artistExample = coll.find({ "results.artistName": { $eq:'Miley Cyrus'}});
        const artistExample1 = coll.aggregate([{$unwind: '$topCharts.data'},
                                                {$match: {'topCharts.data.title' : "God's Plan"}}]);
     


        await artistExample.forEach(console.log);
        console.log("Example 1");
        await artistExample1.forEach(console.log);

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
