const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)
  } catch (error) {
    next(error)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  try {
    if (request.body.title === undefined && request.body.url === undefined) {
      response.status(400).json({error: 'title or url required'})
    }
    const blog = new Blog(request.body)
    const newBlog = await blog.save()
    response.status(201).json(newBlog)
  } catch (error) {
    next(error)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const {title, author, url, likes} = request.body

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, {title, author, url, likes}, {new: true})
    response.json(updatedBlog.toJSON())
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter
