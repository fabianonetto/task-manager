const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/models/task')
const {userOneId,userOne,userTwo,taskOne,taskTwo,taskThree,setupDatabase} = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should create task  for user', async () => {
    const response = 
        await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'From my test'
        })
        .expect(201)

        const task = await Task.findById(response.body._id)
        expect(task).not.toBeNull();
        expect(task.completed).toBeFalsy();
})

test('Should get all tasks from a single user', async () => {
    const response = 
        await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    expect(response.body.length).toEqual(2);
})

test('Should not delete tasks from other users', async() => {
    const response = 
        await request(app)
        .delete(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404)

    const task = await Task.findById(taskOne._id)
    expect(task).not.toBeNull();
})


//
// Task Test Ideas
//
// Should not create task with invalid description/completed
test('Should not create a task with invalid data', async () => {
    await request(app)
    .post('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(400)
})

// Should delete user task
test('Should delete user task', async () => {
    const response = 
        await request(app)
        .delete(`/tasks/${taskTwo._id}`)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    const task = await Task.findById(taskTwo._id)
    expect(task).toBeNull();
})


// Should not delete task if unauthenticated
test('Should not delete task if unauthenticated', async () => {
    await request(app)
    .delete(`/tasks/${taskTwo._id}`)
    .send()
    .expect(401)
})


// Should not update other users task
test('Should not update other users task', async () => {
    await request(app)
    .patch(`/tasks/${taskOne._id}`)
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .send({
        completed: true
    })
    .expect(404)
})


// Should fetch user task by id
test('Should fetch user task by id', async () => {
    const response = 
        await request(app)
        .get(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .expect(200)
    
    const task = await Task.findById(response.body._id)
    expect(JSON.stringify(response.body)).toEqual(JSON.stringify(task));
})

// Should not fetch user task by id if unauthenticated
test('Should not fetch user task by id if unauthenticated', async () => { 
        await request(app)
        .get(`/tasks/${taskOne._id}`)
        .expect(401)
})

// Should not fetch other users task by id
test('Should not fetch other users task by id', async () => {
    await request(app)
    .get(`/tasks/${taskOne._id}`)
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .expect(404)
})


// Should fetch only completed tasks
test('Should fetch only completed tasks', async () => {
    const response = 
        await request(app)
        .get('/tasks?completed=true')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .expect(200)

    const tasks = await Task.find({completed: true, owner: userOneId})
    expect(JSON.stringify(response.body)).toEqual(JSON.stringify(tasks));
})

// Should fetch only incomplete tasks
test('Should fetch only incomplete tasks', async () => {
    const response = 
        await request(app)
        .get('/tasks?completed=false')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .expect(200)

    const tasks = await Task.find({completed: false, owner: userOneId})
    expect(JSON.stringify(response.body)).toEqual(JSON.stringify(tasks));
})

// Should sort tasks by description/completed/createdAt/updatedAt
// Should fetch page of tasks