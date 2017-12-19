const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const postToolbox = require('./post-toolbox')

app
  .prepare()
  .then(() => {
    const server = express()

    server.get('/api/posts', async (req, res) => {
      const posts = await postToolbox.fetchAllPost()
      return res.json({ posts })
    })

    server.get('/api/post/:slug', async (req, res) => {
      const post = await postToolbox.fetchPost(req.params.slug)
      return res.json({ post })
    })

    server.get('/blog/:slug', (req, res) => {
      return app.render(req, res, '/blog-detail', { slug: req.params.slug })
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(3000, err => {
      if (err) throw err
      console.log(`> Ready on http://localhost:3000 ${dev ? 'DEV' : 'PROD'}`)
    })
  })
  .catch(ex => {
    console.error(ex.stack)
    process.exit(1)
  })
