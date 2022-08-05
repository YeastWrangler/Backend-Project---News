const { fetchArticleById } = require('../models/articles.models');
const { fetchCommentsByArticleId, addCommentById,} = require('../models/comments.models')


exports.getCommentsByArticleId = (req, res, next) => {
    const { article_id } = req.params;

    Promise.all([
        fetchArticleById(article_id),
        fetchCommentsByArticleId(article_id)
    ])
    .then((arrayOfComments) => {
        const comments = arrayOfComments[1]
        res.status(200).send({comments})
    }).catch(next);
};

exports.postCommentByArticleId = (req, res, next) => {
    const { article_id } = req.params;
    const { body } = req;
    Promise.all([
        fetchArticleById(article_id),
        addCommentById(article_id, body)
    ])
    .then((arrayOfComments) => {
        const comment = arrayOfComments[1]
        res.status(201).send({comment})
    }).catch(next);

};