//requires
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//uses
app.use(express.static('server/public'));
app.use(bodyParser.json());
//globals
const PORT = process.env.PORT || 5000;
const mongoURI = 'mongodb://localhost:27017/tasks';
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
})
