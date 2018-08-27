
const {ToDo , todoSchema , validateTodo} = require('../models/todo');
const {verifyUser} = require('../middlewares/auth');
const {setHeaders} = require('../middlewares/header');

const mongoose = require('../db/dbConnection');
const express = require('express');
const router = express.Router();

/**
 * 
 *  Incase if we provide name as "number" or "boolean" value then Mongoose does typecast internally.
 *  so in case if string is provided as type and we pass 23 or true, then in Mongo it gets stored as
 *  "23" / "true".
 * 
 *  However, this is not true with Object. If we pass an empty Object against String type, this will fail.  
 * 
 */

router.get('/' , [verifyUser , setHeaders] , (req , res) => {

    // Pull all list of todos from Mongo
    ToDo.find({})
        .then((todos) => {
            res.send({todos});
        })
        .catch((err) => {
            res.status(400).send(`Unable to perform a lookup...${err.message}`);
        })

})

// router.get('/:name' , (req , res) => {

//     const {error} = validateTodo(req.params.name);

//     // console.log(req.params.name);
//     ToDo.find(
//                 {
//                 "name":req.params.name
//                 },
//                 {"name":1 , "text":1 , "_id":0}
//             )
//             .then((todos) => {
//                 res.send({todos})
//             })
//             .catch((err) => {
//                 res.status(400).send(`Error performing lookup...${err}`);
//             })

// })


router.get('/:id' , (req , res) => {

    // Validate Id
    // If Correct - Find Details
    // If Found - Return Object Else Return 404

    const id = req.params.id;
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if(!isValid) return res.status(404).send('Cannot be found...');
    
    ToDo.findById({"_id":id},{"_id":0 , "name":1 , "text":1})
        .then((todo) => {
            if(!todo) res.status(404).send(`Unable to scan todo...`);
            res.send({todo});
        })
        .catch((err) => res.status(400).send(`Unable to find the result...${err.message}`));

})

router.delete('/:id' , (req , res) => {

    // Validate if ID is as per ObjectID norms
    // If Yes - check for its existence
    // If Yes - send data Else send error


    const isValidTodo = mongoose.Types.ObjectId.isValid(req.params.id);
    if(!isValidTodo) return res.status(404).send(`Unable to look for Id...`);

    ToDo.findByIdAndRemove({"_id":req.params.id})
        .select({"_id":0 , "name":1 , "text":1})
        .then((deletedToDo) => {
            if(!deletedToDo) return res.status(404).send(`Unable to lookup Id...`)
            res.send(deletedToDo);
        })
        .catch((err) => res.status(400).send(`Error deleting Todo...`));

})


router.put('/:id' , (req , res ) => {

    const isValidTodo = mongoose.Types.ObjectId.isValid(req.params.id);
    if(!isValidTodo) return res.status(404).send(`Unable to look for provided Id...`);

    const bodytxt = req.body.text;      // Validate It
    // console.log(bodytxt);
    ToDo.findByIdAndUpdate({"_id":req.params.id} , {"$set":{"text":bodytxt}} , {"new":true})
        .select({"_id":0 , "name":1 , "text":1})
        .then((todo) => {
            if(!todo) return res.status(400).send(`Unable to lookup ID...`);
            res.send({todo})
        })
        .catch((err) => res.status(400).send(`Error updating the document...${err.message}`));

})


router.post('/' , (req , res) => {

    // Validate Input From User , Load Joi - done
    const {error} = validateTodo(req.body);
    let errors = [];
    if(error){
        error.details.forEach((error) => {
            if(error.message)
                errors.push(error.message);
        })
        return res.status(400).send(errors);
    }

    
    var todo = new ToDo ({

        name: req.body.name,
        text: req.body.text,
        isCompleted: (req.body.isCompleted) ? req.body.isCompleted : false

    })

    todo.save()
        .then((document) => {
            res.send({
                name: document.name,
                text: document.text
            });
        })
        .catch((err) => {
            // console.log(`Error during insertion..${err.message}`);
            res.status(400).send(err.message);
        })

});



module.exports = router;