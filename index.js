

const express = require('express');
const db = require('./startUp/db');
const app = express();
const User = require('./routes/user');
const Task = require('./routes/task');

app.use(express.json());
app.use('/api/users', User);
app.use('/api/tasks', Task);


const port = process.env.PORT||3000
const server = app.listen(port,()=>{
	console.log(`listening on port ${port}...`);
});

module.exports = server;
