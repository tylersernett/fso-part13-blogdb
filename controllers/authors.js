const router = require('express').Router();
const { sequelize } = require('../util/db');

const { Blog } = require('../models');

router.get('/', async (req, res) => {
  const blogsByAuthor = await Blog.findAll({
    attributes: [
      'author',
      [sequelize.fn('COUNT', sequelize.col('id')), 'articles'], //count the # of IDs by one author
      [sequelize.fn('SUM', sequelize.col('likes')), 'likes'], //sum the # of likes by one author
    ],
    group: ['author'], //stack repeated authors into 1 group (and determine that COUNT & SUM above should aggregate on 'author')
    order: [['likes', 'DESC']], //order by summed likes descending
  })
  res.json(blogsByAuthor);
})

module.exports = router;
