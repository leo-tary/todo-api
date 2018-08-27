const {User , userSchema , validateUser , pickValidate} = require('../models/user');
const {setHeaders} = require('../middlewares/header');
const {verifyUser} = require('../middlewares/auth');

const express = require('express');
const mongoose = require('mongoose');
const _ = require('lodash');
const config = require('config');
const bcrypt = require('bcrypt');

const router = express.Router();


// User Login

router.post('/me' , [setHeaders] , async (req , res) => {

    const {error} = pickValidate(req.body);
    if(error){
        res.status(400).send(`${error.details[0].message}`);
        return;
    }


    User.findOne({"email":req.body.email})
        .then(async (user) => {

            if(!user) return res.status(403).send(`Invalid User...`);

            const validatePass = await bcrypt.compare(req.body.password , user.password);
            if(validatePass) {
                const token = user.generateAuthToken();
                res.send(token);
            }else{
                //return res.status(403).send(`User details cannot be identified... ${req.body.email}`);
                return Promise.reject();        // Using Promise static method (reject)
            }


        })
        .catch((err) => {
            res.status(400).send(`Error during ${req.body.email} lookup...`);
        })

})


// Creating New User

router.post('/' , setHeaders ,  (req , res) => {

    const {error} = pickValidate(req.body);
    if(error){
        // console.log(error.details[0].message);
        res.status(400).send(`${error.details[0].message}`);
        return;
    }

    User.find({"email":req.body.email} , {"_id":1 , "email":1})
        .then(async (userFound) => {
            if(userFound.length != 0) {
                res.send(`Email ${req.body.email} already exists...`);
                return;
            }

            const securedPass = await bcrypt.hash(req.body.password , 10);
            const user = new User({
                email: req.body.email,
                password: securedPass
            });
            const token = user.generateAuthToken();
            

            user.save()
                .then((user) => {
                    const newUser = _.pick(user , ['email']);
                    res.header('x-auth' , token).send(newUser);
                })
                .catch((err) => {
                    // Ideally messages like this should be logged instead of sending them to user
                    res.status(400).send(`Error occurred during save...`);  
                })
        })
        .catch((err) => {
            res.status(400).send(`Error during ${req.body.email} lookup...`);
        })


});



module.exports = router;