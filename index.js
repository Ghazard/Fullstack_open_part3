const http = require('http')
const express = require('express')
const app = express()
var morgan = require('morgan')
const cors = require('cors')

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })

app.use(express.json())
app.use(morgan(':method :url :status :req[header] - :response-time ms :body'))
app.use(cors())
app.use(express.static('build'))


let persons = [
    {
      "id": 1,
      "name": "Arto Hellas",
      "number": "040-123456"
    },
    {
      "id": 2,
      "name": "Ada Lovelace",
      "number": "39-44-5323523"
    },
    {
      "id": 3,
      "name": "Dan Abramov",
      "number": "12-43-234345"
    },
    {
      "id": 4,
      "name": "Mary Poppendieck",
      "number": "39-23-6423122"
    }
]


app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
  response.send(`<p>Phonebook has info for ${persons.length} people</p> <p> ${Date()}</p>`)
  console.log(Date())
})

app.get('/api/persons/:id', (request, response) => {
  const id =  Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if(person){
    response.json(person)
  }
  else{
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

app.post('/api/persons/', (request, response) => {
  const newPerson = request.body
  inBook = persons.find(person => person.name === newPerson.name)
  const id = Math.floor((Math.random() * 10000) + 1)

  if(!newPerson.name && !newPerson.number){
    response.status(400).json({error: 'Name and number must be given'})
  }
  else if (inBook) {
    response.status(400).json({error: 'Name is already in the phonebook'})
  }
  else{
    persons = persons.concat({id: id, ...newPerson})
    response.json(newPerson)
  }
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
