const express = require('express')
require('express-async-errors')
const app = express()

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

const blogsRouter = require('./controllers/blogs')

app.use(express.json())

app.use('/api/blogs', blogsRouter)

//add error handling LAST
app.use((err, req, res, next) => {
  console.error(err) // Log the error for debugging purposes

  res.status(500).json({ error: 'Internal server error' })
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