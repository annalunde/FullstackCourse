import React, { useState, useEffect } from "react"

import Filter from "./components/Filter.js"
import PersonForm from "./components/PersonForm.js"
import Persons from "./components/Persons.js"
import personService from './services/Person.js'
import Notification from './components/Notification'
import Error from './components/Error'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filterName, setFilterName] = useState("")
  const [notifyMessage, setNotifyMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [deletedNames, setDeletedNames] = useState([])

  useEffect(() => {
    personService.getAll().then(initPersons => {
      setPersons(initPersons);
    });
  }, []);

  const handleNewNameChange = event => {
    setNewName(event.target.value);
  };

  const handleNewNumberChange = event => {
    setNewNumber(event.target.value);
  };

  const handleFilterNameChange = event => {
    setFilterName(event.target.value);
  };

  const handleDelPerson = id => {
    if (persons.filter(per => per.id === id).length) {
      personService.del(id)
      const copy = [...persons]
      const ind = copy.findIndex(pl=> pl.id === id)
      const delCopy = [...deletedNames]
      delCopy.push(copy[ind].name)
      setDeletedNames(delCopy)
      setPersons(copy.filter(p => p.id !== id))
      setNotifyMessage(`Deleted`) 
    }
    else {
      setErrorMessage("Already deleted")
    }
  }

  const handleNewPersonSubmit = event => {
    event.preventDefault()
    const duplicatePersons = persons.filter(
    person => person.name === newName.trim())
      if (duplicatePersons.length) {
        if(window.confirm(`${newName} is already added to phonebook. Replace the old number with a new one?`)){
          const updatedPerson = {
            name: newName.trim(), number: newNumber.trim()}
          const id = duplicatePersons[0].id
          personService.update(id, updatedPerson).then(people => {
            setPersons(
              persons.map(pe => {
                return pe.id === people.id ? people : pe;
              }),
              setNotifyMessage(
                `${updatedPerson.name} was updated`),
                setNewName(""),
                setNewNumber("")
              )}).catch(err => {
                setPersons(persons.filter(person => {
                    return person.id !== id;
                  })
                )
                setErrorMessage(
                  `${newName}  has already been deleted`)
                })
              }
            }
            
      else {  
      const newPerson = {
        name: newName.trim(), number: newNumber.trim()
      }
      personService.create(newPerson)
      .then(response => {
      setPersons(
        persons.concat(response))
      setNewName("")
      setNewNumber("")
      setNotifyMessage(
        `${newPerson.name} was added`
      )
      setTimeout(() => {
        setNotifyMessage(null)
      }, 5000)
    })}}


  const personsToShow = filterName
    ? persons.filter(person => person.name.search(filterName) !== -1)
    : persons;

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notifyMessage} />
      <Error message={errorMessage} />

      <Filter value={filterName} onChange={handleFilterNameChange} />

      <PersonForm
        onSubmit={handleNewPersonSubmit}
        name={newName}
        number={newNumber}
        onNameChange={handleNewNameChange}
        onNumberChange={handleNewNumberChange}
      />

      <h2>Numbers</h2>

      <Persons persons={personsToShow} delPerson={handleDelPerson} />
    </div>
  )
  }

export default App