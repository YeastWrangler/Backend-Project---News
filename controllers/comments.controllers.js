const { fetchArticleById } = require('../models/articles.models');
const { fetchCommentsByArticleId } = require('../models/comments.models')


exports.getCommentsByArticleId = (req, res, next) => {
    const { article_id } = req.params;

    Promise.all([
        fetchArticleById(article_id),
        fetchCommentsByArticleId(article_id)
    ])
    .then((arrayOfComments) => {
        const comments = arrayOfComments[1]
        // this is returning all comments, which I now have a test for, but as I'm using
        // Promise.all if I send the entire arrayOfComments it also includes the results
        // from fetchArticleById on index 0, which I dont want, but I'm using that function to 
        // check that the article_id is valid. So am sending all the comments that are on index 1
        res.status(200).send({comments})
    }).catch(next);
};