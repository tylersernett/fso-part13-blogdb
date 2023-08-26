const router = require('express').Router()
const { tokenExtractor, userValidator } = require('../util/middleware')

const { ReadingList, User } = require('../models')

router.post('/', async (req, res) => {
  const readingList = await ReadingList.create(req.body)
  res.json(readingList)
})

router.put('/:id', tokenExtractor, userValidator, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  const readingList = await ReadingList.findByPk(req.params.id)
  if (!readingList) {
    return res.status(404).json({ error: 'Reading List ID not found' })
  }
  if (user.id !== readingList.userId) {
    return res.status(403).json({ error: 'Users may only modify their own reading list' })
  }

  readingList.read = req.body.read
  await readingList.save()

  return res.json(readingList)
})

module.exports = router