const express = require('express');
const app = express();

const {getTopics} = require('./controllers/topic.controllers')

app.get('/api/topics', getTopics)

app.all('*', (req, res) => {
    res.status(404).send({msg: 'invalid path'})
});


module.exports = app;
