const Blog = require("../models/blog")

const blogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs
}


module.exports = { blogsInDB }
