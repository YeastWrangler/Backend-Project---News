const db = require('../db/connection')

exports.fetchCommentsByArticleId = (id) => {
    return db
    .query(`SELECT *
    FROM comments
    WHERE comments.article_id = $1;`, [id])
    .then(({rows: comments})=> {
      return comments;
      })
};

exports.addCommentById = (id, newComment) => {
  const { username: author, body} = newComment
  return db
  .query(`INSERT INTO comments  
  (body, author, article_id)
  VALUES ($1, $2, $3) 
  RETURNING *;`, [body, author, id])
  .then(({rows: [comment]}) => {
    return comment;
  })
}