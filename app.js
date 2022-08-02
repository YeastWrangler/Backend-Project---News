const express = require('express');
const app = express();

app.use(express.json());


const {getTopics} = require('./controllers/topic.controllers');
const {getArticlesById} = require('./controllers/articles.controllers');
const {patchArticlesById} = require('./controllers/articles.controllers');

app.get('/api/topics', getTopics);

app.get('/api/articles/:article_id', getArticlesById);

app.patch('/api/articles/:article_id', patchArticlesById);

app.all('*', (req, res) => {
    res.status(404).send({msg: 'invalid path'})
});


/////////////////////////////////

app.use((err, req, res, next) => {
    if(err.code === '22P02'){
        res.status(400).send({msg: 'invalid request'})
    } else next(err)
});
app.use((err, req, res, next) => {
    res.status(err.status).send({msg: err.msg})
})


module.exports = app;