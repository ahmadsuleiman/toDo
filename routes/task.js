const express = require('express');
const router = express.Router();
const taskRepo = require('../repos/taskRepo');
const userRepo = require('../repos/userRepo');
router.post('/', async (req, res) => {

    const validator = validate(req.body);
    if (validator.msg) return res.status(400).send(validator.msg);

    const user = await userRepo.findUserById(validator.userid);
    if (!user) return res.status(401).send("invalid user id");

    const task = await taskRepo.createTask(validator.taskname, validator.description, validator.userid);
    console.log("TASK : ", task);
    res.send(task);
});

router.get('/:userid', async (req, res) => {

    const userid = req.params.userid;
    const user = await userRepo.findUserById(userid);
    if (!user) return res.status(400).send("user doesn't exist");
    const tasks = await taskRepo.getTasks(userid);
    res.send(tasks);
});

router.put('/:userid/:taskid', async (req, res) => {
    const { userid, taskid } = req.params;

    const user = await userRepo.findUserById(userid);
    if (!user) return res.status(400).send("user doesn't exist");

    const task = await taskRepo.findTask(taskid);
    if (!task) return res.status(400).send(`task doesn't exist`);

    const updatedTask = await taskRepo.updateTask(task);
    res.send(updatedTask);
});

router.get('/', async (req, res) => {
    const tasks = await taskRepo.getAllTasks();
    res.send(tasks);
})
function validate(req) {
    const { taskname, description, userid } = req
    const task = { taskname: taskname, description: description, userid: userid, msg: '' };
    if (!taskname) task.msg = ("enter task name");
    if (!userid) task.msg = ('user id is missing');
    return task;
}

module.exports = router;