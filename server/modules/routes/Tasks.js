const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TaskSchema = new Schema ({
    name: {type: String},
    description: {type: String},
    completed: {type: Boolean, default: false},
    category: {type: String}
});
const mongoURI = 'mongodb://localhost:27017/tasks';
const Task = mongoose.model('tasksList', TaskSchema);
//connecting and testing connection to MongoDB
mongoose.connect(mongoURI, {useNewUrlParser: true});
mongoose.connection.on('open', () => {
    console.log('Connected to Mongo');
});
mongoose.connection.on('error', (error) => {
    console.log('Error connecting to Mongo', error);
});
router.post('/', (req, res) => {
    console.log('/POST hit');
    taskFromClient = req.body;
    const taskToAdd = new Task(taskFromClient);
    taskToAdd.save().then((() => {
        console.log('Task added:', taskToAdd);
        res.sendStatus(201);
    })).catch(((error) => {
        console.log('error', error);
        res.sendStatus(500);
    }));
});
router.get('/', (req,res) => {
    console.log('/GET hit');
    Task.find({}).then((foundTasks) => {
        res.send(foundTasks);
    }).catch((error) => {
        console.log(error);
    });
});
router.put('/updateTask/:id', (req, res) => {
    console.log('/PUT hit');
    Task.findOne({_id: req.params.id}).then((foundTask) => {
        foundTask.completed = true;
        foundTask.save().then(((response) => {
            res.sendStatus(200);
        })).catch((error) => {
            res.sendStatus(500);
            console.log('error', erro);
        })
    })
});
router.delete('/deleteTask/:id', (req, res) => {
    console.log('/DELETE hit');
    
    Task.findByIdAndRemove(req.params.id).then( (response) => {
        res.sendStatus(200);
    }).catch((error) => {
        res.sendStatus(500);
    });
})
module.exports = router;