const {MongoClient , ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/playground' , { useNewUrlParser: true } , (err , client) => {

    if(err)
        return console.log(`Error connecting to mongodb...${err}`)
    
    console.log(`Connected to mongodb...`);

    const dbName = 'playground';
    const db = client.db(dbName);

    db.collection('Users').findOneAndUpdate({
                                                "_id": new ObjectID('5b5f2dfa9f781c373fff9564')
                                    },
                                    {
                                        "$inc":{
                                            "age":-1
                                        },
                                        "$set":{
                                            "name":"Mongo Compass"
                                        }
                                    },
                                    {"returnOriginal":false}
                                )
                                .then((res) => {
                                    console.log(res);
                                })
                                .catch((err) => {
                                    console.log(`Error updating document....${err}`);
                                })
                                

})