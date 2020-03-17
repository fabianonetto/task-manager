const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser: true,
    useCreateIndex: true
})

const User = mongoose.model('User',{
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        minlength: 6,
        trim: true,
        validate(value) {
            if(value.toLowerCase().includes('password')){
                throw new Error ('Password can not contain string password')
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error ('Email is invalid')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if(value < 0) {
                throw new Error('Age must be a positve number')
            }
        }
    }
})

// const me = new User({
//     name: '   Fabiano    ',
//     email: 'FABIANO@GMAIL.COM',
//     age: 36,
//     password: 'asf asdfdas adsafwqe '
// })

// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.error(error)
// })

const Task = mongoose.model('Task',{
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const task = new Task({
    description: '   Eat lunch'
})

task.save().then(() => {
    console.log(task)
}).catch((error) => {
    console.error(error)
})