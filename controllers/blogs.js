const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {

  try {
    const body = request.body
    if (body === undefined) {
      return response.status(400).json({ error: 'content missing' })
    }
    if ((body.title === undefined) || (body.author === undefined) || (body.url == undefined)) {
      return response.status(400).json({ error: 'content missing' })
    }
    if (body.likes==undefined) {
      body.likes = 0;
    }


    const blog = new Blog(request.body)

    const resp = await blog.save()
    response.status(201).json(resp)

    } catch (exception) {
      console.log(exception)
      response.status(500).json({ error: 'exception catched' })
    }
})


blogsRouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)

    response.status(204).end()
  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'malformatted id' })
  }
})

module.exports = blogsRouter
