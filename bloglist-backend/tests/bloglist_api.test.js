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

test('a new blog is successfully saved in database', async () => {
  const initialBlogs = await api.get('/api/blogs')

  const newBlog = {
    "title": "new blog",
    "author": "test new blog",
    "url": "http://newblog.com",
    "likes": 12
  }

  // let blogObject = new Blog(newBlog)
  await api.post('/api/blogs').send(newBlog).expect(201)
    .expect('Content-Type', /application\/json/)
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.body.length + 1)
  const mappedResponse = response.body.map(({title,author,url,likes}) => ({title,author,url,likes}))
  expect(mappedResponse).toContainEqual(newBlog)
})
