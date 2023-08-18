const Blog = require('./blog')
const User = require('./user')

//defining one to many relationship here, so no need to define in the Model classes 
User.hasMany(Blog)
Blog.belongsTo(User)

User.sync({ alter: true })
Blog.sync({ alter: true })

module.exports = {
  Blog, User
}