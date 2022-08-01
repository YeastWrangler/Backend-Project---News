const express = require('express')
const app = express();

const {getTopics} = require('./controllers/topic.controllers')

app.get('/api/topics', getTopics)

app.all('*', (req, res) => {
    res.status(404).send({msg: 'invalid path'})
})


/////////////////////////////////


// app.use((err, req, res, next) => {
//     console.log('error caught')
//     res.status(err.status).send({msg: err.msg})
// })

module.exports = app