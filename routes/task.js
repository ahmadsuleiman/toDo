const express = require('express');
const router = express.Router();
const { Task } = require('../models/task');
const { UserTasks } = require('../models/userstasks');

router.post('/create', async (req, res) => {
    const { taskname, description, userid } = req.body;
    console.log(taskname);
    console.log(description);
    if (!taskname) return res.status(400).send("enter task name");
    if (!userid) return res.status(400).send('user id is missing');
    const task = await Task.create({
        taskname: taskname,
        description: description
    })
        .then(result => result)
        .catch(err => console.log(err));
    res.send(task);
}
);

router.get('/',(req,res)=>{
    const userId = req.body.userId;

    const tasks = UserTasks.findAll({
        where:{
            userId:userId
        }
    });


})


module.exports = router;