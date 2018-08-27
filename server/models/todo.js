const mongoose = require('../db/dbConnection');

const Joi = require('joi');
// Defining Schema

const todoSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        minlength:5,
        trim:true
    },

    text:{
        type:String,
        minlength:2,
        trim:true
    },
    isCompleted:{
        type:Boolean,
        default:false
    },

})

const ToDo = mongoose.model('Todos' , todoSchema);


function validateTodo(todo){

    const schema = {

        name: Joi.string().min(5).required(),
        text: Joi.string().min(5),
        isCompleted: Joi.boolean()

    }
    return Joi.validate(todo , schema , {abortEarly:false});

}


module.exports = {
    ToDo,
    todoSchema,
    validateTodo
}


