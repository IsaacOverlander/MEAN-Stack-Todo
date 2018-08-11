//requires
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema ({
    name: {type: String},
    description: {type: String},
    completed: {type: Boolean, default: false}
});

//uses
app.use(express.static('server/public'));
app.use(bodyParser.json());
//globals
const PORT = process.env.PORT || 5000;
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

//spin up server
app.listen(PORT, () => {
    console.log('Listening on port:', PORT);
});

app.post('/tasks', (req, res) => {
    console.log('/Post hit');
    taskFromClient = req.body;
    const taskToAdd = new Task(taskFromClient);
    taskToAdd.save().then((() => {
        console.log('Task added:', taskToAdd);
        res.sendStatus(201);
    })).catch(((error) => {
        console.log('error', error);
        res.sendStatus(500);
    }));
});//end POST route\