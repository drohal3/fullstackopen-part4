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
Implemented test.

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
Implemented test.

## Exercise 4.5*: helper functions and unit tests, step3
**Task:**
Define a new favoriteBlog function that receives a list of blogs as a parameter. The function finds out which blog has most likes. If there are many top favorites, it is enough to return one of them.

The value returned by the function could be in the following format:
```
{
title: "Canonical string reduction",
author: "Edsger W. Dijkstra",
likes: 12
}
```
NB when you are comparing objects, the toEqual method is probably what you want to use, since the toBe tries to verify that the two values are the same value, and not just that they contain the same properties.

Write the tests for this exercise inside of a new describe block. Do the same for the remaining exercises as well.

**Solution:**
Implemented test

## Exercise 4.6*: helper functions and unit tests, step4
**Task:**
This and the next exercise are a little bit more challenging. Finishing these two exercises is not required in order to advance in the course material, so it may be a good idea to return to these once you're done going through the material for this part in its entirety.

Finishing this exercise can be done without the use of additional libraries. However, this exercise is a great opportunity to learn how to use the [Lodash](https://lodash.com/) library.

Define a function called mostBlogs that receives an array of blogs as a parameter. The function returns the author who has the largest amount of blogs. The return value also contains the number of blogs the top author has:
```
{
author: "Robert C. Martin",
blogs: 3
}
```
If there are many top bloggers, then it is enough to return any one of them.

**Solution:**
Implemented the test.

## Exercise 4.7*: helper functions and unit tests, step5
Define a function called mostLikes that receives an array of blogs as its parameter. The function returns the author, whose blog posts have the largest amount of likes. The return value also contains the total number of likes that the author has received:
```
{
author: "Edsger W. Dijkstra",
likes: 17
}
```
If there are many top bloggers, then it is enough to show any one of them.

**Solution:**
Implemented the test.

## Exercise 4.8: Blog list tests, step1
**Task:**
Use the supertest package for writing a test that makes an HTTP GET request to the /api/blogs url. Verify that the blog list application returns the correct amount of blog posts in the JSON format.

Once the test is finished, refactor the route handler to use the async/await syntax instead of promises.

Notice that you will have to make similar changes to the code that were made in the material, like defining the test environment so that you can write tests that use their own separate database.

**Solution:**
Implemented in bloglist-backend application and the application refactored.

## Exercise 4.9*: Blog list tests, step2
**Task:**
Write a test that verifies that the unique identifier property of the blog posts is named id, by default the database names the property _id. Verifying the existence of a property is easily done with Jest's toBeDefined matcher.

Make the required changes to the code so that it passes the test. The toJSON method discussed in part 3 is an appropriate place for defining the id parameter.

**Solution:**
_id to id transformation already done in previous exercises, new test implemented. 
