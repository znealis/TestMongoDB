
import { ObjectId } from "mongodb";
const dbName = "test"
const coll = "newdata"
const {MongoClient} = require('mongodb');
const path = require('path'); 
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const fs = require('fs');

let db

async function connect() {

    const uri = "mongodb+srv://AdminUser:Asd123asd@capstoneproject.xbu68gm.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);

    try {

        console.log(" # Connecting to database server ...");
        await client.connect();
        console.log("# Connected");
        await listDatabases(client);

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

connect().catch(console.error);
