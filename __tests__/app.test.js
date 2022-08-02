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
            //console.log({body}, 'in test')
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
    test('404 status code with error message when using invalid path', () => {
        return request(app)
        .get('/api/notopics')
        .expect(404)
        .then(({body})=> {
            expect(body.msg).toEqual('invalid path')
        })
    })
})
describe('GET/api/articles/:artcile_id', () => {
    test('200 status code - returns user requested article as an array with object articles that contain all its properties', () => {
        const articleId = 2
        return request(app)
        .get(`/api/articles/${articleId}`)
        .expect(200)
        .then(({body}) => {
            const {article} = body;
            expect(body.article).toBeInstanceOf(Array)
            article.forEach((item) => {
            expect(item).toEqual(
                expect.objectContaining({
                    author: expect.any(String),
                    title: expect.any(String),
                    article_id: expect.any(Number),
                    body: expect.any(String),
                    topic: expect.any(String),
                    created_at: expect.any(String),
                    votes: expect.any(Number)
                })) 
            })
            })
    })
    test('404 code and sends an appropriate error message when given a valid but non-existent id', () => {
        return request(app)
        .get('/api/articles/999')
        .expect(404)
        .then((response) => {
            expect(response.body.msg).toBe('article ID does not exist')
        })
    })
    test.only('400 code and sends an appropriate error message when given an invalid id ', () => {
        return request(app)
        .get('/api/articles/blahblah')
        .expect(400)
        .then((response) => {
            expect(response.body.msg).toBe('invalid id provided')
        })
    })
})