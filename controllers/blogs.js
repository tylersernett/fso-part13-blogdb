const router = require('express').Router()
const { Op } = require('sequelize')
const { tokenExtractor, userValidator } = require('../util/middleware')
const { Blog, User } = require('../models')

router.get('/', async (req, res) => {
  // const blogs = await sequelize.query("SELECT * FROM blogs", { type: QueryTypes.SELECT })

  const where = {}

  if (req.query.search) {
    const searchValue = `%${req.query.search}%`

    where[Op.or] = [
      {
        title: {
          [Op.iLike]: searchValue, //iLike is case insensitive
        },
      },
      {
        author: {
          [Op.iLike]: searchValue,
        },
      },
    ]
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name']
    },
    where,
    order: [['likes', 'DESC']],
  })
  // console.log(blogs.map(b=>b.toJSON())) //use .toJSON to get rid of extraneous db info
  // console.log(JSON.stringify(blogs, null, 2))
  res.json(blogs)
})

//MIDDLEWARE
const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.post('/', tokenExtractor, userValidator, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  if (user) {
    const blog = await Blog.create({ ...req.body, userId: user.id })
    return res.json(blog)
  } else {
    return res.status(404).json("user not found")
  }
})

router.delete('/:id', tokenExtractor, userValidator, blogFinder, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  if (req.blog) {
    if (req.blog.userId === user.id) {
      await req.blog.destroy()
    } else {
      return res.status(403).json({ error: 'Forbidden: only submitter can delete blog' })
    }
  } else {
    return res.status(404).json({ error: 'cannot find blog id' })
  }
  res.status(204).end()
})

router.put('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    req.blog.likes = req.body.likes
    await req.blog.save()
    res.json(req.blog)
  } else {
    res.status(404).end()
  }
})

module.exports = router