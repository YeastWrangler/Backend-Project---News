const db = require('../db/connection')

exports.fetchArticleById = (id) => {
    return db
    .query(`SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.body, articles.created_at, articles.votes, COUNT(comments.comment_id) AS comment_count
    FROM articles 
    LEFT JOIN comments ON comments.article_id = articles.article_id
    WHERE articles.article_id=$1
    GROUP BY articles.article_id;`,[id])
    .then(({rows: article})=> {
        if(article.length === 0) {
          return Promise.reject({status: 404, msg: 'article ID not found'})
        } else 
        return article;
        })
}; 
exports.fetchArticles = (userQuery = 'created_at', userOrder = 'DESC', userTopic, topics) => {
  
const lowerCaseQuery = userQuery.toLowerCase()
const upperCaseOrder = userOrder.toUpperCase()
const validQuery = ['article_id', 'title', 'topic', 'author', 'body', 'created_at', 'votes'];
const validOrder = ['ASC', 'DESC']
const validTopics = topics.map((topic) => {
      return topic.slug
})

if(!validTopics.includes(userTopic) && userTopic) {
  return Promise.reject({status: 404, msg: 'article not found'})
}

if(validTopics.includes(userTopic)) {
  let optionalTopic = `WHERE articles.topic = $1`

if(validQuery.includes(lowerCaseQuery) && validOrder.includes(upperCaseOrder)) {

   return db
   .query(`SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.body, articles.created_at, articles.votes, COUNT(comments.comment_id) AS comment_count
   FROM articles 
   LEFT JOIN comments ON comments.article_id = articles.article_id
   ${optionalTopic}
   GROUP BY articles.article_id
   ORDER BY ${lowerCaseQuery } ${upperCaseOrder};`, [userTopic])
   .then(({rows: articles})=> {
     return articles;
     })
    } }
 
else (validQuery.includes(lowerCaseQuery) && validOrder.includes(upperCaseOrder)) 
 
    return db
    .query(`SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.body, articles.created_at, articles.votes, COUNT(comments.comment_id) AS comment_count
    FROM articles 
    LEFT JOIN comments ON comments.article_id = articles.article_id
    GROUP BY articles.article_id
    ORDER BY ${lowerCaseQuery } ${upperCaseOrder};`)
    .then(({rows: articles})=> {
      return articles;
      })
    }

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

