const lodash = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((prev, next) => prev + next.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((mostPopular, blog) => blog.likes > mostPopular.likes ? blog : mostPopular)
}

const mostBlogs = (blogs) => {
  let grouped = lodash.groupBy(blogs, blog => blog.author)
  return lodash.reduce(grouped, (result, value, key) => result.blogs > value.length ? result : {
    name: key, blogs: value.length
  })
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs
}