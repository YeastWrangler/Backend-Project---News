const {fetchArticleById, addVotes} = require('../models/articles.models')


exports.getArticlesById = (req, res, next) => {
    const { article_id } = req.params
    fetchArticleById(article_id).then(([article]) => {
        res.status(200).send({article})
    }).catch(next);
};

exports.patchArticlesById = (req, res, next) => {
    const { article_id } = req.params
    const { inc_votes } = req.body
    addVotes(inc_votes, article_id).then(([article]) => {
        res.status(201).send({article})
    }).catch(next)
}