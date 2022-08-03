const app = require('../app');
const request = require('supertest');
const testData = require('../db/data/test-data/index');
const db = require('../db/connection');
const seed = require('../db/seeds/seed');


beforeEach(() => {
    return seed(testData)
})

afterAll(() => {
    return db.end()
})

describe('GET/api/topics', () => {
    test('200 status code with a response body of an array of all topic objects', () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then(({body}) => {
            expect(body.topics.length).toBe(3)
        })
    })
    test('200 status code with a response body containing keys of slug & decription', () => {
        return request(app)
        .get('/api/topics')
        .expect(200)
        .then(({body}) => { body.topics.forEach((topic) => {
            expect(topic).toHaveProperty('slug')
            expect(topic).toHaveProperty('description')
        })      
    })
})
})
describe('GET/api/articles/:article_id', () => {
    test('200 status code - returns user requested article as an array with object articles that contain all its properties', () => {
        return request(app)
        .get(`/api/articles/2`)
        .expect(200)
        .then(({body}) => {
            expect(body.article).toMatchObject( 
                {
                    author: expect.any(String),
                    title: expect.any(String),
                    article_id: 2,
                    body: expect.any(String),
                    topic: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number)
                }
                ) 
            })
        })
    test('404 code and sends an appropriate error message when given a valid but non-existent id', () => {
        return request(app)
        .get('/api/articles/999')
        .expect(404)
        .then(({body}) => {
            expect(body.msg).toBe('article ID not found')
        })
    })

    test('400 code and sends an appropriate error message when given an invalid id ', () => {
        return request(app)
        .get('/api/articles/blahblah')
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe('invalid request')
        })
    })
    test('200 status code and includes property of comment-count which displays number of comments for specified article', () => {
        return request(app)
        .get('/api/articles/3')
        .expect(200)
        .then(({body}) => {
            expect(body).toMatchObject({article:
            {
                article_id: 3,
                title: expect.any(String),
                author: expect.any(String),
                topic: expect.any(String),
                body: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number),
                comment_count: '2'
            }
            })
        })
    })
})
describe('PATCH/api/articles/article_id', () => {
    test('increments votes on selected article id and returns updated article object', () => {
        const voteObject = { inc_votes : 5 }
        return request(app)
        .patch('/api/articles/2')
        .send(voteObject)
        .expect(201)
        .then(({body}) => {
            expect(body.article.votes).toBe(5)
        })
    })
    test('decrements votes on selected article id and returns updated article object', () => {
        const voteObject = { inc_votes : -5 }
        return request(app)
        .patch('/api/articles/1')
        .send(voteObject)
        .expect(201)
        .then(({body}) => {
            expect(body.article.votes).toBe(95)
        })
    })
    test('404 status when given a valid but non-existent article_id', () => {
        const voteObject = { inc_votes : 5 }
        return request(app)
        .patch('/api/articles/999')
        .send(voteObject)
        .expect(404)
        .then(({body}) => {
            expect(body.msg).toBe('article ID not found')
        })
    })
    test('400 status code and sends an appropriate error message when given an invalid id', () => {
        const voteObject = { inc_votes : 5 }
        return request(app)
        .patch('/api/articles/blahblah')
        .send(voteObject)
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe('invalid request')
        })
    })
    test('400 status code when no inc_votes is attached to request body', () => {
        const voteObject = {}
        return request(app)
        .patch('/api/articles/2')
        .send(voteObject)
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe('invalid patch request')
        })
    })
    test('400 status code when value of inc_votes is not a Number', () => {
        const voteObject = { inc_votes : 'Wombat' }
        return request(app)
        .patch('/api/articles/2')
        .send(voteObject)
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe('invalid request')
        })
    })

})
describe('GET/api/users', () => {
    test('status 200 and returns an array of objects with appropriate properties', () => {
        return request(app)
        .get('/api/users')
        .expect(200)
        .then(({body}) => {
            expect(body.users).toBeInstanceOf(Array)
            expect(body.users).toHaveLength(4)
            body.users.forEach((user) => {
                expect(user.username).toEqual(expect.any(String));
                expect(user.name).toEqual(expect.any(String));
                expect(user.avatar_url).toEqual(expect.any(String)); 
            })
        })
    })
})
describe('test for all invalid path end points', () => {
    test('404 status code with error message when using invalid path', () => {
        return request(app)
        .get('/api/userNot')
        .expect(404)
        .then(({body})=> {
            expect(body.msg).toEqual('invalid path')
        })
    })
})
describe('GET/api/articles', () => {
    test('200 status and returns an array with articles as objects containing appropriate properties', () => {
        return request(app)
        .get('/api/articles')
        .expect(200)
        .then(({body}) => {
            expect(body.articles).toBeInstanceOf(Array)
            expect(body.articles).toHaveLength(12)
            body.articles.forEach((article) => {
                expect(article).toEqual(expect.objectContaining({ 
                    article_id: expect.any(Number),
                    title: expect.any(String),
                    author: expect.any(String),
                    topic: expect.any(String),
                    body: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number),
                    comment_count: expect.any(String)
                }))
            })
        })
    })
    test('200 status code, returns articles ordered by descending date - most recent first', () => {
        return request(app)
        .get('/api/articles')
        .expect(200)
        .then(({body}) => {
            expect(body.articles).toBeSortedBy('created_at', {descending: true})
        })
    })
})
