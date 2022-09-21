# Fullstack Open - Part4: Structure of backend application, introduction to testing
Part 4 of the Full Stack online course https://fullstackopen.com/en/part4

## Exercise 4.1 Blog list, step1
**Task:**
Let's imagine a situation, where you receive an email that contains the following application body:
```
const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
title: String,
author: String,
url: String,
likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = 'mongodb://localhost/bloglist'
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response) => {
Blog
.find({})
.then(blogs => {
response.json(blogs)
})
})

app.post('/api/blogs', (request, response) => {
const blog = new Blog(request.body)

blog
.save()
.then(result => {
response.status(201).json(result)
})
})

const PORT = 3003
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})
```
Turn the application into a functioning npm project. In order to keep your development productive, configure the application to be executed with nodemon. You can create a new database for your application with MongoDB Atlas, or use the same database from the previous part's exercises.

Verify that it is possible to add blogs to list with Postman or the VS Code REST client and that the application returns the added blogs at the correct endpoint.

**Solution:**
Implemented in bloglist-backend application.

## Exercise 4.2 Blog list, step2
**Task:**
Refactor the application into separate modules as shown earlier in this part of the course material.

NB refactor your application in baby steps and verify that the application works after every change you make. If you try to take a "shortcut" by refactoring many things at once, then Murphy's law will kick in and it is almost certain that something will break in your application. The "shortcut" will end up taking more time than moving forward slowly and systematically.

One best practice is to commit your code every time it is in a stable state. This makes it easy to rollback to a situation where the application still works.

**Solution:**
Refactored bloglist-backend app.

## 4.3: helper functions and unit tests, step1
**Task:**
First define a dummy function that receives an array of blog posts as a parameter and always returns the value 1. The contents of the list_helper.js file at this point should be the following:
```
const dummy = (blogs) => {
// ...
}

module.exports = {
dummy
}
```
Verify that your test configuration works with the following test:
```
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
const blogs = []

const result = listHelper.dummy(blogs)
expect(result).toBe(1)
})
```

**Solution:**
Test implemented in test.test.js.

## Exercise 4.4: helper functions and unit tests, step2
**Task:**
Define a new totalLikes function that receives a list of blog posts as a parameter. The function returns the total sum of likes in all of the blog posts.

Write appropriate tests for the function. It's recommended to put the tests inside of a describe block, so that the test report output gets grouped nicely

Defining test inputs for the function can be done like this:
```
describe('total likes', () => {
const listWithOneBlog = [
{
_id: '5a422aa71b54a676234d17f8',
title: 'Go To Statement Considered Harmful',
author: 'Edsger W. Dijkstra',
url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
likes: 5,
__v: 0
}
]

test('when list has only one blog, equals the likes of that', () => {
const result = listHelper.totalLikes(listWithOneBlog)
expect(result).toBe(5)
})
})
```
**Solution:**
Test implemented in totalLikes.test.js.
