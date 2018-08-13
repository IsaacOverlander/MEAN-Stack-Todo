//requires
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const taskRouter = require('./modules/routes/Tasks');
const databaseConnect = require('./modules/database-connection');
//uses
app.use(express.static('server/public'));
app.use(bodyParser.json());
app.use(databaseConnect);
app.use('/tasks', taskRouter);
//globals
const PORT = process.env.PORT || 5000;
//spin up server
app.listen(PORT, () => {
    console.log('Listening on port:', PORT);
});