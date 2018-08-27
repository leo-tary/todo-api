const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');
const _ = require('lodash');

const mongoose = require('../db/dbConnection');
const validator = require('validator');

// Defining Schema
const userSchema = new mongoose.Schema({

    email:{
        type:String,
        required:true,
        trim:true,
        minlength:3,
        unique:true,
        validate:{
            validator: (value) => {
                return validator.isEmail(value)
            },
            message: '{VALUE} is not a valid email'
        }
    },
    password:{
        type:String,
        required:true,
        minlength:5
    }

})

userSchema.methods.generateAuthToken = function() {

    const token = jwt.sign(
        {
            _id:this._id , 
            email:this.email
        } , 
        config.get("jwtPrivateKey"));

    return token;

}


const User = mongoose.model('users' , userSchema);

function validateUser(userObject){

    const schema = {
        email: Joi.string().min(3).required(),
        password:Joi.string().min(5).required()
    }

    return Joi.validate(userObject , schema);

}

 function pickValidate(userObject) {

    // console.log(`Password:-- ${userObject.password}`);
    const filteredUser = _.pick(userObject , ['email' , 'password']);
    return validateUser(filteredUser);    
}


module.exports = {
    User,
    userSchema,
    validateUser,
    pickValidate
}