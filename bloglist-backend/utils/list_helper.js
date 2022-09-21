const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((prev,next) => prev + next.likes, 0)
}

module.exports = {
  dummy, totalLikes
}