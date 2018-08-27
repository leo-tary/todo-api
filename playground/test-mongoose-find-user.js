// console.log(process);

const {mongoose} = require('../server/db/dbConnection');
const {User} =  require('../server/models/user');


// Case 1 - Find By Email

const email = 'andrew@gmail.com';

User.find(
        {"email":email},
        {"email":1 , "_id":0}
        )
        .then((user) => {
            console.log({user});
        })
        .catch((err) =>{
            console.log(`Error in lookup... ${err.message}`);
        })


// Case 2 - Find By ID

const id = '5b60721760b5c3672e82b60a';

User.findById({
                "_id":id
                }
            )
    .then((user) => {
        console.log({user});
    })
    .catch((err) => {
        console.log(`Error in user lookup...${err.message}`);
    })


// Case 3 - Find For Invalid ID

const inValId = '5b60721760b5c3672e82b60a43';

User.find({
            "_id": inValId
        }
    )
    .then((user) => {
        if(!user)
            return console.log('Unable to lookup user');
        console.log({user});
    })
    .catch((err) =>{
        console.log(`Error getting user...${err.message}`);
    })


// Case 4 - Find For Non-Existant ID (Yet Valid)

const nonExistantId = '6b60721760b5c3672e82b60a';

User.findById({
            "_id": nonExistantId
        }
    )
    .then((user) => {
        if(!user)
            return console.log(`Unable to lookup for user...having ${nonExistantId}`);
        console.log({user})
    })
    .catch((err) =>{
        console.log(`Error in finding id...${err.message}`);
    })