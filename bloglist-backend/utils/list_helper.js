const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((prev,next) => prev + next.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((mostPopular, blog) => blog.likes > mostPopular.likes ? blog : mostPopular)
}

module.exports = {
  dummy, totalLikes, favoriteBlog
}