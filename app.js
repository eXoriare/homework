const express = require('express')
const path = require('path')
const { db } = require('./DB')

const PORT = 3000

const server = express()

server.set('view engine', 'hbs')
server.set('views', path.join(__dirname, 'src', 'views'))

server.use(express.urlencoded({ extended: true }))
server.use(express.static(path.join(__dirname, 'public')))

server.get('/', (req, res) => {
  const query1 = req.query
  // const peopleForRender = db.people.slice(0, query1.limit)

  let peopleForRender = db.people

  if (query1.limit !== undefined && Number.isNaN(+query1.limit) === false) {
    peopleForRender = db.people.slice(0, query1.limit)
  }

  res.render('main', { listOfPeople: peopleForRender })
})

server.post('/adressbook', (req, res) => {
  const dataFromForm = req.body

  db.people.push(dataFromForm)

  res.redirect('/')
})

server.get('*', (req, res) => {
  res.send(`<div>
  <h1>404</h1>
  <a href="/">Как страница пропала?! Срочно возвращаемся на главную!</a>
  <br>
  <img src="404.jpg" width="500">
  </div>`)
})

server.listen(PORT, () => {
  console.log(`Server has been started on port: ${PORT}`)
})
