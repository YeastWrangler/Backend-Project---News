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

describe.only('GET/api/topics', () => {
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
        .then(({body}) => {
            expect(body.topics[0]).toHaveProperty('slug')
            expect(body.topics[0]).toHaveProperty('description')
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