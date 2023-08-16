const router = require('express').Router()

const { Blog } = require('../models')

router.get('/', async (req, res) => {
  // const blogs = await sequelize.query("SELECT * FROM blogs", { type: QueryTypes.SELECT })
  const blogs = await Blog.findAll();
  // console.log(blogs.map(b=>b.toJSON())) //use .toJSON to get rid of extraneous db info
  // console.log(JSON.stringify(blogs, null, 2))
  res.json(blogs)
})

router.post('/', async (req, res) => {
  console.log(req.body)
  try {
    const blog = await Blog.create(req.body)
    res.json(blog)
  } catch (error) {
    return res.status(400).json({ error })
  }
})

router.delete('/:id', async (req, res) => {
  const blogId = req.params.id
  try {
    const blog = await Blog.findByPk(blogId);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' })
    }
    await blog.destroy()
    res.status(204).send() // No Content
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' })
  }
})

module.exports = router