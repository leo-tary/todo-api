
/**
 *  This will be kind of index.js file; Hence loading mongoose here
 *  Once we use express, we'll have to import routers, so that routers aren't required to load mongoose explicitly
 *  
 */

const mongoose = require('mongoose');

const oid = new mongoose.Types.ObjectId('57bdc6f33905744e0e51815f').getTimestamp();
// console.log(oid);


mongoose.connect('mongodb://localhost/playground')
        .then(() => console.log(`Connected to mongodb...`))
        .catch((err) => console.log(`Error connecting mongodb...${err}`))


module.exports = mongoose;