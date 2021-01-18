let server;
const request = require('supertest');
const Task = require('../repos/taskRepo');

describe('Create Task',  ()=> {
    beforeEach(async ()=> server = require('../index'));
    afterEach(async ()=> server.close())

    it('should return 400 status code due to missing task name',  async ()=> {

        const data = {
            taskname: '',
            userid: 1
        }
         await request(server)
            .post('/api/tasks/create')
            .send(data)
            .set('Accept', 'application/json')
            .expect(400)
            .expect('enter task name');
    });

    it('should return 400 status code due to missing userid',  async ()=> {
        const data = {
            taskname: 'eating',
            userid: ''
        }
         await request(server)
            .post('/api/tasks/create')
            .send(data)
            .set('Accept', 'application/json')
            .expect(400)
            .expect('user id is missing');
    });

    it('should return 401 status code due to invalid userid',  async ()=> {
        const data = {
            taskname: 'eating',
            userid: 1
        }
         await request(server)
            .post('/api/tasks/create')
            .send(data)
            .set('Accept', 'application/json')
            .expect(401)
            .expect('invalid user id');
    });

    it('should return 200 status code for valid input',  async ()=> {
        const userData = {
            username: 'ahmad',
            password: '12345678'
        }
         await request(server)
            .post('/api/users/register')
            .send(userData)
            .set('Accept', 'application/json');
        const data = {
            taskname: 'eating',
            userid: 1
        }
         await request(server)
            .post('/api/tasks/create')
            .send(data)
            .set('Accept', 'application/json')
            .expect(200)
    });
});

describe('Get Tasks',  ()=> {
    beforeEach(async ()=> server = require('../index'));
    afterEach(async ()=> server.close())

    it('should return 400 status code for invalid userid',  async ()=> {
         await request(server)
            .get('/api/tasks/4')
            .expect(400)
            .expect("user doesn't exist")
    });

    it('should return 200 status code for valid input',  async ()=> {

        const userData = {
            username: 'ahmad',
            password: '12345678'
        }
         await request(server)
            .post('/api/users/register')
            .send(userData)
            .set('Accept', 'application/json');
         await request(server)
            .get('/api/tasks/1')
            .expect(200)
    });
});

describe('Update Task', ()=> {
    beforeEach(async ()=> server = require('../index'));
    afterEach(async ()=> server.close())

    it('should return 400 status code for invalid userid',  async ()=> {

         await request(server)
            .put('/api/tasks/6/1')
            .expect(400)
            .expect("user doesn't exist")
    });

    it('should return 400 status code for invalid taskid',  async ()=> {
        
        const userData = {
            username: 'ahmad',
            password: '12345678'
        }
         await request(server)
            .post('/api/users/register')
            .send(userData)
            .set('Accept', 'application/json');
         await request(server)
            .put('/api/tasks/1/1')
            .expect(400)
            .expect("task doesn't exist")
    });

    it('should return 200 status code for valid input',  async ()=> {
        const userData = {
            username: 'ahmad',
            password: '12345678'
        }
         await request(server)
            .post('/api/users/register')
            .send(userData)
            .set('Accept', 'application/json');
        const taskData = {
            taskname:'shopping',
            description:"",
            userId:1
        };
         await request(server)
            .post('/api/tasks/create')
            .send(taskData)
            .set('Accept', 'application/json');
         await request(server)
            .put('/api/tasks/1/1')
            .expect(200)
    });
});