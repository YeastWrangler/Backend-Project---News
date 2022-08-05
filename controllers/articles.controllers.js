const {fetchArticleById, addVotes, fetchArticles} = require('../models/articles.models')
const {fetchTopics} = require('../models/topic.models')

exports.getArticlesById = (req, res, next) => {
    const { article_id } = req.params
    fetchArticleById(article_id).then(([article]) => {
        res.status(200).send({article})
    }).catch(next);
};

exports.getArticles = (req, res, next) => {
    const { sort_by: userQuery, order: userOrder, topic: userTopic } = req.query;
        fetchTopics()
        .then((topics) => {
            return fetchArticles(userQuery, userOrder, userTopic, topics)
        })
    .then((articles) => {
        res.status(200).send({articles})
    }).catch(next);
};

exports.patchArticlesById = (req, res, next) => {
    const { article_id } = req.params
    const { inc_votes } = req.body
    addVotes(inc_votes, article_id).then(([article]) => {
        res.status(201).send({article})
    }).catch(next);
};