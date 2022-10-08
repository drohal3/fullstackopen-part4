const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate("user",{username: 1, name: 1, id: 1})
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

    const user = await  User.findOne({})
    console.log(user.id)
    const blogdata = {...request.body,...{user: user.id}}
    console.log("blogData",blogdata)
    const blog = new Blog(blogdata)
    const newBlog = await blog.save()
    user.blogs = user.blogs.concat(newBlog._id)
    await user.save()
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
