//const { TableHints } = require('sequelize/types');
const {Task} = require('../models/index');
const {sequelize} = require('../startUp/db');

module.exports = {

    createTask: function (taskname, description, userid) {
        const task = Task.create({
            taskname: taskname,
            description: description,
            UserId: userid
        })

        return task;
    },

    getTasks: function (userid) {
        return tasks = Task.findAll({
            where: {
                userId: userid
            }
        })
    },

    findTask: function(taskid){
        return Task.findOne({
            where:{
                id:taskid
            }
        })
    },

    updateTask: function(taskid){
        return Task.update({ status:sequelize.literal('NOT status')}, {
            where: {
                id: taskid
            }
        })
    },

    validate: function (req) {
        const { taskname, description, userid } = req
        const task = { taskname: taskname, description: description, userid: userid, msg: '' };
        if (!taskname) task.msg = ("enter task name");
        if (!userid) task.msg = ('user id is missing');
        return task;
    }
}