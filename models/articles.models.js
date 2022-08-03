const db = require('../db/connection')

exports.fetchArticles = (id) => {
    return db
    .query(`SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.body, articles.created_at, articles.votes, COUNT(comments.comment_id) AS comment_count
    FROM articles 
    LEFT JOIN comments ON comments.article_id = articles.article_id
    WHERE articles.article_id=$1
    GROUP BY comments.article_id, articles.article_id;`,[id])
    .then(({rows: article})=> {
        if(article.length === 0) {
          return Promise.reject({status: 404, msg: 'article ID not found'})
        } else 
        return article;
        })
}; 
exports.addVotes = (inc_votes, article_id) => {
    if (!inc_votes) {
     return Promise.reject({status: 400, msg: 'invalid patch request'})
   }
     return db
     .query(`UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;`,[inc_votes, article_id])
     .then(({rows: article}) => {
        if(article.length === 0) {
          return Promise.reject({status: 404, msg: 'article ID not found'})
       } else
        return article;
    })  
}
