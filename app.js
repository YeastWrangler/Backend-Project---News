const express = require('express');
const app = express();
const cors = require('cors');


app.use(cors());
app.use(express.json());

const {getJSON} = require('./controllers/api.controllers');
const {getTopics} = require('./controllers/topic.controllers');
const {getArticlesById, patchArticlesById, getArticles} = require('./controllers/articles.controllers');
const {getUsers} = require('./controllers/users.controllers')
const {postCommentByArticleId, getCommentsByArticleId, deleteCommentById} = require('./controllers/comments.controllers')

app.get('/api', getJSON);

app.get('/api/topics', getTopics);

app.get('/api/articles/:article_id', getArticlesById);

app.get('/api/users', getUsers);

app.get('/api/articles', getArticles);

app.get('/api/articles/:article_id/comments', getCommentsByArticleId)

app.post('/api/articles/:article_id/comments', postCommentByArticleId)

app.patch('/api/articles/:article_id', patchArticlesById);

app.delete('/api/comments/:comment_id', deleteCommentById)

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
    if(err.code === '23502'){
        res.status(400).send({msg: 'bad post information'})
    } else next(err)
});

app.use((err, req, res, next) => {
    if(err.code === '42703' || err.code === '42601'){
        res.status(400).send({msg: 'Bad Request'})
    }
    else next(err)
})


app.use((err, req, res, next) => {
    res.status(err.status).send({msg: err.msg})
})


module.exports = app;
