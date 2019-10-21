import React, { useState, useEffect } from "react";

import Filter from "./components/Filter.js";
import PersonForm from "./components/PersonForm.js";
import Persons from "./components/Persons.js";
import personService from './services/Person.js';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");

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
    personService.del(id)
    setPersons(persons.filter(pers=> pers.id !== id))
  }

  const handleNewPersonSubmit = event => {
    const duplicatePersons = persons.filter(
      person => person.name === newName.trim()
    )
    if (duplicatePersons.length >=1) {
      if(window.confirm(`${newName} is already added to phonebook. Replace the old number with a new one?`)){
        const updatedPerson = {
          name: newName.trim(), number: newNumber.trim()}
        const id = duplicatePersons[0].id
        personService.update(id, updatedPerson)
        setNewName("")
        setNewNumber("")
        personService.getAll().then(response => {
          setPersons(response)})
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
  })}}


  const personsToShow = filterName
    ? persons.filter(person => person.name.search(filterName) !== -1)
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
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