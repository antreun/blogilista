const helper = require('./test_helper')
const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})



test('a valid blog can be added ', async () => {
  const newBlog = {
      title: 'testiblogi',
      author: 'testihenkilö',
      url: 'http://www.google.fi',
      likes: 5,
    }

    const blogsBefore = await helper.blogsInDB()

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAfter = await helper.blogsInDB()

  expect(blogsAfter.length).toBe(blogsBefore.length + 1)
  const contents = blogsAfter.map(r => r.title)
  expect(contents).toContain('testiblogi')
})

test('a invalid blog cannot be added ', async () => {
  const newBlog = {
      title: 'nolikesblog',
    }

  const blogsBefore = await helper.blogsInDB()

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const blogsAfter = await helper.blogsInDB()

  expect(blogsAfter.length).toBe(blogsBefore.length)
  const contents = blogsAfter.map(r => r.title)
  expect(contents).not.toContain('nolikesblog')
})

test('adding blog without likes will set likes to 0 ', async () => {
  const newBlog = {
      title: 'nolikesblog2',
      author: 'nolikesblog_author',
      url: 'https://www.google.fi'
    }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(response.body.likes).toBe(0)
})

afterAll(() => {
  server.close()
})
