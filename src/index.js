const express = require('express')
require("./db/mongoose")
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

// app.use((req,res,next) => {
//     if(req.method === 'GET') {
//         res.send('GET requests are disabled')
//     }else {
//         next()
//     }
// })

// app.use((req,res,next) => {
//     res.status(503).send('System under maintenance')
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})


const User = require("./models/user")
const Task = require("./models/task")

const main = async () => {
    // const task = await Task.findById('5e78e7c5a0be3f4a59aa9f51')
    // await task.populate('owner').execPopulate()
    // console.log(task.owner)

    const user = await User.findById('5e78e6d5b57e3f4196f41b53')
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)
    
}

main()