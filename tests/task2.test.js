let server;
const request = require('supertest');
const Task = require('../repos/taskRepo');

describe('Vaildate', ()=>{
    it('returns enter task name',async ()=>{
        const result = Task.validate({taskname:"",description:"",userid:1});
        expect(result.msg).toBe("enter task name");
    })
    it("returns enter user id",async ()=>{
        const result = Task.validate({taskname:"shopping",description:"",userid:''});
        expect(result.msg).toBe("user id is missing");
    })

    it('is valid input',async ()=>{
        const result = Task.validate({taskname:"shopping",description:"",userid:1});
        expect(result.msg).toBe("");
    })
});

describe('Create Task', ()=>{
    Task.createTask = function(taskname,description,userid){
        let tasks=[];
        tasks.push({taskname:taskname,description:description,userid:userid});
        return tasks[tasks.length-1];
    }
    it('should return task object',async ()=>{
        const result = Task.createTask("shopping","",1);
        expect(result).toMatchObject({taskname:'shopping',description:'',userid:1});
    })
});

describe('Get Tasks', ()=>{
    Task.getTasks=function(userid){
        const tasks = [{taskid:1,taskname:"shopping",description:"",userid:1},
        {taskid:2,taskname:"Eating",description:"",userid:1},
        {taskid:3,taskname:"Eating",description:"",userid:2}];

        let userTasks = [];
        for(let i=0;i<tasks.length;i++){
            if(tasks[i].userid===userid)
            userTasks.push(tasks[i]);
        }
        return userTasks;
    }
    it('should return all user tasks',async ()=>{
        const result = Task.getTasks(1);
        expect(result.length).toBe(2);
    })
})

describe('Find Task', ()=>{
    Task.findTask = function(taskid){
        const tasks = [1,2,3,4];
        if(tasks.includes(taskid))
            return true;
        return false;
    }
    it('should return false due to invalid task id',async ()=>{
        const result = Task.findTask(6);
        expect(result).toBe(false);
    })
    it('should return true due to vlaid task id',async ()=>{
        const result = Task.findTask(1);
        expect(result).toBe(true);
    })
});

describe('Update Task', ()=>{
    Task.updateTask =function(taskid){
        const task = [{taskid:1, status:false},
        {taskid:2,status:false},
        {taskid:3,status:true}];

        for(let t=0;t<task.length;t++){
            if(task[t].taskid===taskid){
                task[t].status=!task[t].status;
                return task[t];
            }
        }
        return false;
    }
    it('should return task object',async ()=>{
        const result = Task.updateTask(1);
        expect(result).toMatchObject({taskid:1,status:true});
    });
    it('should return false due to invalid task id',async ()=>{
        const result = Task.updateTask(6);
        expect(result).toBe(false);
    })
})