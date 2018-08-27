
module.exports.setHeaders = (req , res , next) => {

    res.header('x-powered-by' , 'Todo-app');
    next();

}