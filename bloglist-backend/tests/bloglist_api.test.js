const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    "title": "test blog 1",
    "author": "Test1 Test1",
    "url": "http://test1.com",
    "likes": 84
  },
  {
    "title": "test blog 2",
    "author": "Test2 Test2",
    "url": "http://test2.com",
    "likes": 27
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})

test('id is the identifier', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})