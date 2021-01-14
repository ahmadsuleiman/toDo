//const config = require('config');

const express = require('express');
const db = require('./startUp/db');
const app = express();
const User = require('./routes/user');
const Task = require('./routes/task');


/*if(!config.get('jwtPrivateKey')){
	console.log("FATAL ERROR: jwtPrivateKey is not defined");
	process.exit(1);
}*/
app.use(express.json());
app.use('/api/users', User);
app.use('/api/tasks', Task);



const server = app.listen(3000,()=>{
	console.log("listening on port 3000...");
});

module.exports = server;
