const {MongoClient, ObjectID} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'


MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error,client) => {
    if (error){
        return console.log('Unable to connect to database')
    }
    
    const db = client.db(databaseName)

    // db.collection('users').findOne({_id: new ObjectID('5e6fa2830d05b71343582959')},(error,user) => {
    //     if(error){
    //         return console.log('Unable to fecth')
    //     }

    //     console.log(user)
    // })


    db.collection('tasks').findOne({_id: new ObjectID("5e6ea548f6e4a27ebe67dd56")},(error,task) => {
        if(error) {
            return console.log('Unable to fetch task')
        }

        console.log(task)
    })

    db.collection('tasks').find({completed:false}).toArray((error,tasks) => {
        if(error){
            return console.log(error)
        }

        console.log(tasks)
    })
})