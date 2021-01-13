const express = require('express');
const app = express();

const User = require('./routes/user');
const Task = require('./routes/task');

app.use(express.json());
app.use('/api/users',User);
app.use('/api/tasks',Task);

app.post('/',(req,res)=>{
	res.send('hello');
})

app.listen(3000,()=>{
	console.log("listening on port 3000...");
});

