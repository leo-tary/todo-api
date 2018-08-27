
const user = require('./routes/user');
const todo = require('./routes/todo');

const express = require('express');
const app = express();

app.use(express.json());

app.use('/api/users' , user);
app.use('/api/todos', todo);

const port = process.env.port || 2100;

app.listen(port , () => {
    console.log(`app listening to port ${port}...`);
})