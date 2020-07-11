// helper functions

const dummy = (blogs) => {
  return 1
}

const favoriteBlog = (blogs) => {
  // which blog has most likes
  // can probably clean this
  if (blogs.length === 0) return 0
  const reducer = (max, item) => {
    return Math.max(max, item)
  }
  const maxLike = blogs.map((blog) => blog.likes).reduce(reducer, -Infinity)
  const ans = blogs.find((blog) => blog.likes === maxLike)

  return blogs.length === 1 ? blogs[0] : ans
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  if (blogs.length === 0) {
    return 0
  } else {
    return blogs.length === 1 ? blogs[0].likes : blogs.reduce(reducer, 0)
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
