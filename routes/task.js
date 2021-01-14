const express = require('express');
const router = express.Router();
const { Task } = require('../models/task');
const { User } = require('../models/user');

router.post('/create', async (req, res) => {
    const { taskname, description, userid } = req.body;

    if (!taskname) return res.status(400).send("enter task name");
    if (!userid) return res.status(400).send('user id is missing');

    const user = await User.findOne({
        where: {
            id: userid
        }
    })
    if (!user) return res.status(401).send("invalid user id");

    const task = await Task.create({
        taskname: taskname,
        description: description,
        UserId: userid
    })
        .then(result => result)
        .catch(err => err);
    res.send(task);

}
);

router.get('/:userId', async (req, res) => {

    const userId = req.params.userId;
    const user = await User.findOne({
        where: {
            id: userId
        }
    }).then(result => result)
        .catch(err => err);
    if (!user) return res.status(400).send("user doesn't exist");
    const tasks = await Task.findAll({
        where: {
            UserId: userId
        }
    }).then(result => result)
        .catch(err => err);
    res.send(tasks);
});

router.put('/:userId/:taskId', async (req, res) => {
    const { userId, taskId } = req.params;
    const user = await User.findOne({
        where: {
            id: userId
        }
    }).then(result => result)
        .catch(err => err);

    if (!user) return res.status(400).send("user doesn't exist");

    const task = await Task.findOne({
        where: {
            id: taskId
        }
    }).then(result => result)
        .catch(err => err);
    if (!task) return res.status(400).send(`task doesn't exist`);

    const updatedTask = await Task.update({ status: true }, {
        where: {
            id: taskId
        }
    }).then(result => result)
        .catch(err => err);
    res.send(updatedTask);
});


module.exports = router;