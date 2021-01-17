const express = require('express');
const router = express.Router();
const taskRepo = require('../repos/taskRepo');
const userRepo = require('../repos/userRepo');
router.post('/create', async (req, res) => {

    const validator = taskRepo.validate(req.body);
    if (validator.msg) return res.status(400).send(validator.msg);

    const user = await userRepo.findUserById(validator.userid);
    if (!user) return res.status(401).send("invalid user id");

    const task = await taskRepo.createTask(validator.taskname, validator.description, validator.userid);
    res.send(task);
});

router.get('/:userId', async (req, res) => {

    const userid = req.params.userId;
    
    const user = await userRepo.findUserById(userid);
    if (!user) return res.status(400).send("user doesn't exist");

    const tasks = await taskRepo.getTasks(userid);
    res.send(tasks);
});

router.put('/:userId/:taskId', async (req, res) => {
    const { userId, taskId } = req.params;
    
    const user = await userRepo.findUserById(userId);
    if (!user) return res.status(400).send("user doesn't exist");

    const task = await taskRepo.findTask(taskId);
    if (!task) return res.status(400).send(`task doesn't exist`);

    const updatedTask = taskRepo.updateTask(taskId);
    res.send(updatedTask);
});


module.exports = router;