

const express = require('express');
const db = require('./startUp/db');
const app = express();
const User = require('./routes/user');
const Task = require('./routes/task');

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.use(express.json());
app.use('/api/users', User);
app.use('/api/tasks', Task);


const port = process.env.PORT || 4000
const server = app.listen(port, () => {
	console.log(`listening on port ${port}...`);
});

module.exports = server;
