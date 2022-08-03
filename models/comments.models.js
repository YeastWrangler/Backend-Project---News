const db = require('../db/connection')

exports.fetchCommentsByArticleId = (id) => {
    return db
    .query(`SELECT comments.comment_id, comments.author, comments.body, comments.created_at, comments.votes
    FROM comments
    WHERE comments.article_id=${id};`)
    .then(({rows: comments})=> {
      if(comments.length === 0) {
        return Promise.reject({status: 404, msg: 'comment not found'})
      } else 
      return comments;
      })
};