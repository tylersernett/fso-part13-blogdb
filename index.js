const express = require('express')
require('express-async-errors')
const app = express()

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const logoutRouter = require('./controllers/logout')
const authorsRouter = require('./controllers/authors')
const readingListsRouter = require('./controllers/readingLists')

app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/logout', logoutRouter)
app.use('/api/authors', authorsRouter)
app.use('/api/readinglists', readingListsRouter)

//add error handling LAST
app.use((err, req, res, next) => {
  console.error(err) // Log the error for debugging purposes
  if (err.name.startsWith('Sequelize')) {
    return res.status(400).send({ error: err.errors[0].message });
  }
  //this is now handled by the sequelize error message above
  // if (err.name === 'SequelizeValidationError') {
  //   if (err.errors[0].message === 'Validation isEmail on username failed') {
  //     return res.status(400).send({ error: 'username must be an email address' })
  //   }
  // } else if (err.name === 'SequelizeUniqueConstraintError') {
  //   return res.status(400).send({ error: err.errors[0].message })
  // }
  res.status(500).json({ error: 'Internal server error' })
  next(err)
})

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()

//QUERY TEST CODE
// const main = async () => {
//   try {
//     await sequelize.authenticate()
//     const blogs = await sequelize.query("SELECT * FROM blogs", { type: QueryTypes.SELECT })
//     console.log(blogs)
//     sequelize.close()
//   } catch (error) {
//     console.error('Unable to connect to the database:', error)
//   }
// }

// main()