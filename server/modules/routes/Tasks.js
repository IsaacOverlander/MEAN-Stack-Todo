// requires
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//globals
const Schema = mongoose.Schema;
const TaskSchema = new Schema ({
    name: {type: String},
    description: {type: String},
    completed: {type: Boolean, default: false},
    category: {type: String}
});
const Task = mongoose.model('tasksList', TaskSchema);
//routes
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
        foundTask.completed = !foundTask.completed;
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