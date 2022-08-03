const { fetchArticleById } = require('../models/articles.models');
const { fetchCommentsByArticleId } = require('../models/comments.models')


exports.getCommentsByArticleId = (req, res, next) => {
    const { article_id } = req.params;

    Promise.all([
        fetchArticleById(article_id),
        fetchCommentsByArticleId(article_id)
    ])
    .then((comments) => {
        newComments = comments[1]
        //not sure if this is a correct way to only send comments?
        res.status(200).send({newComments})
    }).catch(next);
};