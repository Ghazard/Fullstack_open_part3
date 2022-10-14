const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide password, name and number')
  process.exit(1)
}
const password = process.argv[2]

if (process.argv.length > 4) {
  console.log('Adding new name')
  var name = process.argv[3]
  var number = process.argv[4]
}

const url = `mongodb+srv://alaitinen:${password}@cluster0.r76l6.mongodb.net/?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  number: {
    type: String,
  }
})

const Person = mongoose.model('Person', personSchema)

mongoose
  .connect(url)
  .then((result) => {
    console.log('connected! ', result)

    if (process.argv.length > 4) {
      const person = new Person({
        name: name,
        number: number
      })

      console.log(`Added ${name} number ${number} to phonebook`)
      person.save().then(result => {
        console.log('close connection ', result)
        mongoose.connection.close()
      })
    }

    else {
      console.log('Phonebook;')
      Person.find({}).then(result => {
        result.forEach(person => {
          console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
      })
    }
  })
  .then(() => {
    return
  })
  .catch((err) => console.log(err))
