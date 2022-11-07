const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://AdminUser:Asd123asd@capstoneproject.xbu68gm.mongodb.net/?retryWrites=true&w=majority";

const connect = async () => {

    try {

        console.log(" # Connecting to database server ...")
        const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })
        console.log("# Connected")
        return client

    }
    catch(err){
        console.error("# Database connection error")
        throw err
    }
}

module.exports = connect;