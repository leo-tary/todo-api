const {MongoClient , ObjectID} = require('mongodb');
const {prettyPrint} = require('./utility');

const oid = new ObjectID();
console.log(oid);


MongoClient.connect('mongodb://localhost:27017/playground' , { useNewUrlParser: true } , (err , client) => {

    if(err)
        return console.log(`error connecting to mongodb...${err}`);

    console.log(`Connected to mongodb...`);


    const dbName = 'playground';
    const db = client.db(dbName);

    db.collection('Todos').deleteOne({
                    "_id": new ObjectID("5b5f6f958826db03ae696e28")
    } , (err , result) => {

        if(err)
            return console.log(`Error deleting document...${err}`)

        // console.log(`document successfully deleted...${result}`);
        console.log(result);
    })

    db.collection('Todos').findOneAndDelete({
                        "_id": new ObjectID('5b5f6fc68826db03ae696e29')
                        })
                        .then((res) => {
                            console.log(prettyPrint(res));
                        })
                        .catch((err) => {
                            console.log(`Error in deleting document...${err}`);
                        })


    db.collection('Todos').deleteMany({})
                            .then((res) => {
                                    console.log(prettyPrint(res));

                            })
                            .catch((err) => {
                                    console.log(`Error removing the document...${err}`);
                            })


})