const {MongoClient , ObjectID} = require('mongodb');

const {prettyPrint} = require('./utility');

const oid = new ObjectID();

MongoClient.connect('mongodb://localhost:27017/playground' , {} , (err , client) => {

    if(err)
        return console.log(`Error connecting mongodb...${err}`);
    
    console.log(`Connected to mongodb...`);

    const dbName = 'playground';
    const db = client.db(dbName);

    db.collection('Users').find(
                                    {
                                        // "_id": new ObjectID('5b5f2ed09159f739ce80ff0e')
                                        "age":{
                                            "$gte":30 , "$lte":34
                                        }
                                    }
                                ).toArray()
                                .then((response) => {
                                    console.log(prettyPrint(response));
                                })
                                .catch((err) => {
                                    console.log(`Error returning documents from mongodb...`);
                                })

})