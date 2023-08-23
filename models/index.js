const Blog = require('./blog')
const User = require('./user')
const ReadingList = require('./readingList')

//defining one to many relationship here, so no need to define in the Model classes 
User.hasMany(Blog)
Blog.belongsTo(User)

//don't use these if using migrations
// User.sync({ alter: true })
// Blog.sync({ alter: true })

Blog.belongsToMany(User, { through: ReadingList, as: 'readers' })
User.belongsToMany(Blog, { through: ReadingList, as: 'readings' })

module.exports = {
  Blog, User, ReadingList
}