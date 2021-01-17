//const { TableHints } = require('sequelize/types');
const Task = require('../models/task');
const User = require('../models/user');
const {sequelize} = require('../startUp/db');

module.exports = {

    createTask: function (taskname, description, userid) {
        const task = Task.create({
            taskname: taskname,
            description: description,
            UserId: userid
        })
            .then(result => result)
            .catch(err => err);
        return task;
    },

    getTasks: function (userid) {
        const tasks = Task.findAll({
            where: {
                userId: userid
            }
        })
            .then(result => result)
            .catch(err => err);
        return tasks;
    },

    findTask: function(taskid){
        const task = Task.findOne({
            where:{
                id:taskid
            }
        })
            .then(result=>result)
            .catch(err=>err);
        return task;
    },

    updateTask: function(taskid){
        const updatedTask = Task.update({ status:sequelize.literal('NOT status')}, {
            where: {
                id: taskid
            }
        }).then(result => result)
            .catch(err => err);
        
        return updatedTask;
    },

    validate: function (req) {
        const { taskname, description, userid } = req
        const task = { taskname: taskname, description: description, userid: userid, msg: '' };
        if (!taskname) task.msg = ("enter task name");
        if (!userid) task.msg = ('user id is missing');
        return task;
    }
}