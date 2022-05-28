import { useState, useEffect } from 'react'
import service from './services/persons'
import axios from 'axios'
import Search from './components/Search'
import Form from './components/Form'
import Display from './components/Display'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterPhrase, setFilterPhrase] = useState('')
  const [showFiltered, setShowFiltered] = useState(true)
  const [message, setMessage] = useState(null)

  const handleInputNameChange =(event) => {
    setNewName(event.target.value)
  }
  const handleInputNumberChange =(event) => {
    setNewNumber(event.target.value)
  }
  const handleFilter =(event) => {
    setShowFiltered()
    setFilterPhrase(event.target.value)
  }
  const personsToShow = showFiltered
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(filterPhrase))


  const displayAddNotif = (name) => {
    setMessage(
      `'${name}' was added.`
    )
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const addNewName =(event) => {
    event.preventDefault()
    let nameAdding = {
      name: newName,
      id: persons.length + 1,
      number:newNumber
    }
    console.log();
    if (persons.some(e => (e.name===newName && e.number!==newNumber))) {
      console.log('NUMBER DIFFERENT');
      console.log('newobject: ', nameAdding);
      if (window.confirm(`${nameAdding.name} is already added to the phonebook, replace the old number with new one?`)) {
        nameAdding.id = persons.find(p => (p.name===newName)).id
        let newPersons = [...persons]
        newPersons = newPersons.filter(function(p) {
          return p.name !== newName;
        })
        setPersons(newPersons.concat(nameAdding))
        setNewName('')
        setNewNumber('')
        service.update(persons.find(p => (p.name===newName)).id, nameAdding)
          .then(response => {
            console.log('successful update')
          })
          .catch(error => {
          setMessage(
            `${nameAdding.name} has already been removed from the server`
          )
          setTimeout(() => {
            setMessage(null)
          }, 2000)
      })
      }
    }
    else if (persons.some(e => (e.name===newName && e.number===newNumber))) {
      console.log('BOTH SAME');
      window.alert(`${newName} is already added to phonebook`)
    }
    else if (persons.some(e => (e.name!==newName && e.number!==newNumber))) {
      setPersons(persons.concat(nameAdding))
      setNewName('')
      setNewNumber('')
      service.create(nameAdding)
      displayAddNotif(nameAdding.name)
    }
  }

  const delete_entry = person => {
    if (window.confirm(`Delete ${person.name}?`)) {
      console.log('deleting ', person.name);
      console.log('old persons:', persons);
      let newPersons = [...persons]
      newPersons = newPersons.filter(function(p) {
        return p.id !== person.id;
      })
      service.delete_person(person.id)
      setPersons(newPersons)
    }
  }

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
  useEffect(hook, [])

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message}/>
      <Search phrase={filterPhrase} handle={handleFilter}/>
      <h2>Add a new</h2>
      <Form newName={newName} handleInputNameChange={handleInputNameChange} newNumber={newNumber}
       handleInputNumberChange={handleInputNumberChange} addNewName={addNewName}/>
      <h2>Numbers</h2>
      <Display personsToShow={personsToShow} delete_function={delete_entry} />
      {/* <Display personsToShow={personsToShow} /> */}
    </div>
  )
}

export default App