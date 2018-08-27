const config = require('config');
const jwt = require('jsonwebtoken');


module.exports.verifyUser = (req , res , next) => { 
    
    try{
        const token = req.header('x-auth');
        if(!token) {
            res.status(401).send(`Invalid request...`);
            return;
        }
        const decodedUser = jwt.verify(token , config.get('jwtPrivateKey'))
        req.body.user = decodedUser;

    }catch(ex){

        res.status(400).send(`Error during authenticating the request ${ex}...`);

    }

    next();
}