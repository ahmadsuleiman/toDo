let server;
const request = require('supertest');
const Task = require('../repos/taskRepo');

describe('Create Task', () => {
    beforeEach(() => server = require('../index'));
    afterEach(() => server.close())

    it('should return 400 status code due to missing task name',  () => {

        const data = {
            taskname: '',
            userid: 1
        }
         request(server)
            .post('api/tasks/create')
            .send(data)
            .set('Accept', 'application/json')
            .expect(400)
            .expect('enter task name');
    });

    it('should return 400 status code due to missing userid',  () => {
        const data = {
            taskname: 'eating',
            userid: ''
        }
         request(server)
            .post('api/tasks/create')
            .send(data)
            .set('Accept', 'application/json')
            .expect(400)
            .expect('user id is missing');
    });

    it('should return 401 status code due to invalid userid',  () => {
        const data = {
            taskname: 'eating',
            userid: 1
        }
         request(server)
            .post('api/tasks/create')
            .send(data)
            .set('Accept', 'application/json')
            .expect(401)
            .expect('invalid user id');
    });

    it('should return 200 status code for valid input',  () => {
        const userData = {
            username: 'ahmad',
            password: '12345678'
        }
         request(server)
            .post('api/users/register')
            .send(userData)
            .set('Accept', 'application/json');
        const data = {
            taskname: 'eating',
            userid: 1
        }
         request(server)
            .post('api/tasks/create')
            .send(data)
            .set('Accept', 'application/json')
            .expect(200)
    });
});

describe('Get Tasks', () => {
    beforeEach(() => server = require('../index'));
    afterEach(() => server.close())

    it('should return 400 status code for invalid userid',  () => {
         request(server)
            .get('api/tasks/4')
            .expect(400)
            .expect("user doesn't exist")
    });

    it('should return 200 status code for valid input',  () => {

        const userData = {
            username: 'ahmad',
            password: '12345678'
        }
         request(server)
            .post('api/users/register')
            .send(userData)
            .set('Accept', 'application/json');
         request(server)
            .get('api/tasks/1')
            .expect(200)
    });
});

describe('Update Task',() => {
    beforeEach(() => server = require('../index'));
    afterEach(() => server.close())

    it('should return 400 status code for invalid userid',  () => {

         request(server)
            .put('api/tasks/1/1')
            .expect(400)
            .expect("user doesn't exist")
    });

    it('should return 400 status code for invalid taskid',  () => {
        
        const userData = {
            username: 'ahmad',
            password: '12345678'
        }
         request(server)
            .post('api/users/register')
            .send(userData)
            .set('Accept', 'application/json');
         request(server)
            .put('api/tasks/1/1')
            .expect(400)
            .expect("task doesn't exist")
    });

    it('should return 200 status code for valid input',  () => {
        const userData = {
            username: 'ahmad',
            password: '12345678'
        }
         request(server)
            .post('api/users/register')
            .send(userData)
            .set('Accept', 'application/json');
        const taskData = {
            taskname:'shopping',
            userId:1
        };
         request(server)
            .post('api/tasks/create')
            .send(taskData)
            .set('Accept', 'application/json');
         request(server)
            .put('api/tasks/1/1')
            .expect(200)
            .expect("task doesn't exist")
    });
});

describe('Vaildate',()=>{
    it('returns enter task name',()=>{
        const result = Task.validate({taskname:"",description:"",userid:1});
        expect(result.msg).toBe("enter task name");
    })
    it("returns enter user id",()=>{
        const result = Task.validate({taskname:"shopping",description:"",userid:''});
        expect(result.msg).toBe("user id is missing");
    })

    it('is valid input',()=>{
        const result = Task.validate({taskname:"shopping",description:"",userid:1});
        expect(result.msg).toBe("");
    })
});

describe('Create Task',()=>{
    Task.createTask = function(taskname,description,userid){
        let tasks=[];
        tasks.push({taskname:taskname,description:description,userid:userid});
        return tasks[tasks.length-1];
    }
    it('should return task object',()=>{
        const result = Task.createTask("shopping","",1);
        expect(result).toMatchObject({taskname:'shopping',description:'',userid:1});
    })
});

describe('Get Tasks',()=>{
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
    it('should return all user tasks',()=>{
        const result = Task.getTasks(1);
        expect(result.length).toBe(2);
    })
})

describe('Find Task',()=>{
    Task.findTask = function(taskid){
        const tasks = [1,2,3,4];
        if(tasks.includes(taskid))
            return true;
        return false;
    }
    it('should return false due to invalid task id',()=>{
        const result = Task.findTask(6);
        expect(result).toBe(false);
    })
    it('should return true due to vlaid task id',()=>{
        const result = Task.findTask(1);
        expect(result).toBe(true);
    })
});

describe('Update Task',()=>{
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
    it('should return task object',()=>{
        const result = Task.updateTask(1);
        expect(result).toMatchObject({taskid:1,status:true});
    });
    it('should return false due to invalid task id',()=>{
        const result = Task.updateTask(6);
        expect(result).toBe(false);
    })
})