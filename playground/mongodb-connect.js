/**
 *  docs:
 *  http://mongodb.github.io/node-mongodb-native/3.1/api/Collection.html
 *  http://mongoosejs.com/docs/guide.html
 */
const fs = require('fs');
const {prettyPrint} = require('./utility');         // Destructure

// const MongoClient = require('mongodb').MongoClient;     // returns function

const {MongoClient , ObjectID} = require('mongodb');    // Destructuring to pull/use properties as variables

let oid = new ObjectID();
// console.log(oid.getTimestamp());

/**
 * 
 *  Object ID (Generated by Mongo DB driver not MongoDB - so that MongoDB does have to have to generate 
 *              the Identifier ending in slowing the process.)
 *  1) It's a 24 character long string with every two characters represent 1 byte.
 *  2) So we have 12 bytes to uniquely identity a document
 *  3) First 4 bytes (8 Characters) has timestamp; We can directly pull timestamp from 
 *      Object ID and no need to store it separately
 *  4) Next 3 bytes stores Machine Identitifer i.e. two different machine will have different identifier.
 *  5) Next 2 bytes represent Process Identifier - If we generate two Object IDs 
 *      on same machine but with two different process, these 2 bytes of Process Identifier will be different.
 *  6) Last 3 bytes represents counter (like Auto Inc number)
 * 
 *  Mongoose is an abstraction over MongoDB driver
 */


MongoClient.connect('mongodb://localhost:27017/playground' , {useNewUrlParser: true} , (err , client) => {

    if(err)
       return  console.log(`Error connecting Mongodb....${err}`);

       console.log(`Connected to mongo...`);

    const dbName = 'playground';
    const db = client.db(dbName);       // DB is set here (playground)



    // db.collection('PerformanceTest').deleteMany({})
    //                                 .then((res) => {
    //                                     console.log(prettyPrint(res));
    //                                 })
    //                                 .catch((err) => {
    //                                     console.log(err);
    //                                 })



    // const startTime = new Date().getMilliseconds();
    const incr = 0;    
    for(let counter = 1; counter<= 15000 ; counter++){

        const startTime = new Date().getMilliseconds();
        db.collection('PerformanceTest').insert({
            name:'PerformanceRecord'+ counter,
            text: 'Some text for performance' + counter,
            isCompleted: false
        } , (err , result) => {

            if(err)
                return console.log(`Unable to insert new document...${err}`);
            
                // console.log(prettyPrint(result.ops));
                
                const endTime = new Date().getMilliseconds();
                const totalTimeTaken = endTime - startTime;
                incr += totalTimeTaken;
                console.log(`Time Taken to insert 1 record: ${totalTimeTaken} ms`);
        })

    }
        
    console.log(`Total Time Taken to insert records: ${incr} ms`);
    fs.appendFileSync('performaceMongoNative.json' , `\nTotal Time Taken to insert records: ${incr} ms`);
    

    // db.collection('PerformanceTest').insertOne({
    //     name:'PerformanceRecord'+ i,
    //     text: 'Some text for todos',
    //     isCompleted: false
    // } , (err , result) => {

    //     if(err)
    //         return console.log(`Unable to insert new document...${err}`);

    //     console.log(JSON.stringify(result.ops , undefined , 2));
    // })


    // insertedDocument(db , (err , result) => {

    //     if(err)
    //         return console.log(`Error inserting document...${err}`);
        
    //     console.log(prettyPrint(result.ops));

    // });


    client.close();

})


let insertedDocument = (db , callback) => {

    db.collection('Users').insertOne({

        name: 'Tary',
        age: 34,
        location: 'Delhi'

    } , (err , result) => {

        if(err){
            callback(err);
        }else{
            callback(undefined , result);
        }
            
    });

}

let readFileData = () => {

    try{
        const readFile = fs.readFileSync('performaceMongoNative.json');
        // console.log(JSON.parse(readFile));
        const fileData = JSON.parse(readFile);
        return fileData;
    }catch(ex){
        return [];
    }

}



        // .then(() => console.log("Connected to mongodb...."))
        // .catch((err) => console.log(`error connecting mongodb...${err}`));

