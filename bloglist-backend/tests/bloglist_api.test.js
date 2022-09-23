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

afterAll(() => {
  mongoose.connection.close()
})

describe('blog api', () => {
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
    const mappedResponse = response.body.map(({title, author, url, likes}) => ({title, author, url, likes}))
    expect(mappedResponse).toContainEqual(newBlog)
  })

  test('missing likes property fallbacks to 0', async () => {
    const blogToAdd = {
      "title": "new blog",
      "author": "test new blog",
      "url": "http://newblog.com"
    }

    await api.post('/api/blogs').send(blogToAdd)
    const response = await api.get('/api/blogs')
    const mappedResponse = response.body.map(({title, author, url, likes}) => ({title, author, url, likes}))
    blogToAdd.likes = 0;
    expect(mappedResponse).toContainEqual(blogToAdd)
  })

  test('missing title and url results in 400 error code', async () => {
    const blogToAdd = {
      "author": "test new blog",
      "likes": 2
    }
    await api.post('/api/blogs').send(blogToAdd).expect(400)
  })

  test('Deleted blog is deleted.', async () => {
    const initDbResponse = await api.get('/api/blogs')
    const blogToRemove = initDbResponse.body[0]
    await api.delete(`/api/blogs/${blogToRemove.id}`)
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initDbResponse.body.length - 1)
    expect(response.body).not.toContainEqual(blogToRemove)
  })

  test('updated likes are saved', async () => {
    const initDbResponse = await api.get('/api/blogs')
    const blogToUpdate = initDbResponse.body[0]
    const newLikes = blogToUpdate.likes + 10
    await api.put(`/api/blogs/${blogToUpdate.id}`).send({likes: newLikes})
    blogToUpdate.likes = newLikes
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initDbResponse.body.length)
    expect(response.body).toContainEqual(blogToUpdate)
  })

  test('blog is indeed updated', async () => {
    const initDbResponse = await api.get('/api/blogs')
    const blogToUpdate = initDbResponse.body[0]
    const newValues = {
      title: blogToUpdate.title + ' updated',
      author: blogToUpdate.author + ' updated',
      url: blogToUpdate.url + '/updated',
      likes: blogToUpdate.likes + 10
    }
    await api.put(`/api/blogs/${blogToUpdate.id}`).send(newValues)
    newValues.id = blogToUpdate.id
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initDbResponse.body.length)
    expect(response.body).toContainEqual(newValues)
  })
})

