
const {MongoClient , ObjectID} = require('mongodb');
const {prettyPrint} = require('./utility');

const oid = new ObjectID();
console.log(oid);

MongoClient.connect('mongodb://localhost:27017/playground' , {useNewUrlParser: true} , (err , client) => {

    if(err)
        return console.log(`Error connecting Mongodb...${err}`);
    
    console.log(`Connected to mongo db...`);


    const dbName = 'playground';
    const db = client.db(dbName);       // Database Handler

    db.collection('Todos').find({
                                    "_id": new ObjectID('5b5f2b1c5ee81c2e962166f7')
                                }).toArray()
                                .then( (res) => {
                                        console.log(prettyPrint(res));
                                }) 
                                .catch( (err) => {
                                        console.log(`Error finding documents...${err}`)
                                });

})