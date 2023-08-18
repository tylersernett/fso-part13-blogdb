const Blog = require('./blog')
const User = require('./user')

//defining one to many relationship here, so no need to define in the Model classes 
User.hasMany(Blog)
Blog.belongsTo(User)

//don't use these if using migrations
// User.sync({ alter: true })
// Blog.sync({ alter: true })

module.exports = {
  Blog, User
}