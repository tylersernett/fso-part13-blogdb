const router = require('express').Router()

const { Blog } = require('../models')

router.get('/', async (req, res) => {
  // const blogs = await sequelize.query("SELECT * FROM blogs", { type: QueryTypes.SELECT })
  const blogs = await Blog.findAll();
  // console.log(blogs.map(b=>b.toJSON())) //use .toJSON to get rid of extraneous db info
  // console.log(JSON.stringify(blogs, null, 2))
  res.json(blogs)
})

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.post('/', async (req, res) => {
  console.log(req.body)
  try {
    const blog = await Blog.create(req.body)
    res.json(blog)
  } catch (error) {
    return res.status(400).json({ error })
  }
})

router.delete('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    await req.blog.destroy()
  }
  res.status(204).end()
})

router.put('/:id', blogFinder, async(req, res) => {
  if (req.blog) {
    req.blog.likes = req.body.likes
    await req.blog.save()
    res.json(req.blog)
  } else {
    res.status(404).end()
  }
})

module.exports = router