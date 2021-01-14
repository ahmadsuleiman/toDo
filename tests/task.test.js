const fetch = require('node-fetch');

describe('Create Task', () => {
    it('should return 400 status code due to missing task name', async () => {
        const res = await fetch("http://localhost:3000/api/tasks/create", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                taskname: '',
                userid: '1'
            })
        });
        expect(res.status).toBe(400);
    });

    it('should return 400 status code due to missing userid', async () => {
        const res = await fetch("http://localhost:3000/api/tasks/create", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                taskname: 'Shopping',
                userid: ''
            })
        });
        expect(res.status).toBe(400);
    });

    it('should return 401 status code due to invalid userid', async () => {
        const res = await fetch('http://localhost:3000/api/tasks/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                taskname: 'Shopping',
                userid: 6
            })
        });
        expect(res.status).toBe(401);
    });

    it('should return 200 status code for valid input', async () => {
        const res = await fetch('http://localhost:3000/api/tasks/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                taskname: 'Shopping',
                userid: 1
            })
        });
        expect(res.status).toBe(200);
    });
});

describe('Get Tasks', () => {
    
    it('should return 400 status code for invalid userid', async () => {
        const res = await fetch('http://localhost:3000/api/tasks/3', {
            method: 'GET'
        });
        expect(res.status).toBe(400);
    });

    it('should return 200 status code for valid input', async () => {
        const res = await fetch('http://localhost:3000/api/tasks/1', {
            method: 'GET'
        });
        expect(res.status).toBe(200);
    });
});

describe('Update Task', ()=>{
    it('should return 400 status code for invalid userid',async () =>{
        const res = await fetch('http://localhost:3000/api/tasks/5/1', {
            method: 'PUT'
        });
        expect(res.status).toBe(400);
    });

    it('should return 400 status code for invalid taskid',async () =>{
        const res = await fetch('http://localhost:3000/api/tasks/1/4', {
            method: 'PUT'
        });
        expect(res.status).toBe(400);
    });

    it('should return 200 status code for valid input',async () =>{
        const res = await fetch('http://localhost:3000/api/tasks/1/1', {
            method: 'PUT'
        });
        expect(res.status).toBe(200);
    });
});