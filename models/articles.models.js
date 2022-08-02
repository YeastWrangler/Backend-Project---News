const db = require('../db/connection')

exports.fetchArticles = (id) => {
    return db
    .query(`SELECT * FROM articles WHERE article_id = $1;`, [id])
    .then(({rows: article})=> {
        if(article.length === 0) {
          return Promise.reject({status: 404, msg: 'article ID does not exist'})
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
          return Promise.reject({status: 404, msg: 'article ID does not exist'})
       } else
        return article;
    })  
}
