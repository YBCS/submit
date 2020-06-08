// 2.11

import React, { useState, useEffect } from "react"
import axios from 'axios'

import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import Filter from "./components/Filter"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [newSearch, setSearch] = useState("")

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    var dupli = false 
    persons.forEach((person) => {
      if(person.name === newName) {
        dupli = true
      }
    })
    // console.log("duplis ", dupli)
    if (dupli) {
        window.alert(`${newName} is already added to phonebook`)
    } else {
      console.log("button clicked", event.target)
      const newPerson = {
        name: newName,
        number: newNumber,
      }
      setPersons(persons.concat(newPerson)) 
    }
  }

  const handleNewName = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };
  const handleNewNumber = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };
  const handleSearch = (event) => {
    setSearch(event.target.value);
    console.log(event.target.value);
  };

  // where is the right place to define this
  const filteredPerson = persons.filter((person) => {
    return person.name.toLowerCase().includes(newSearch.toLowerCase());
  });
  // console.log(filteredPerson.length)

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter newSearch={newSearch} handleSearch={handleSearch} />

      <h2>add a new</h2>

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNewName={handleNewName}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
      />

      <h2>Numbers</h2>

      <Persons persons={filteredPerson} />
    </div>
  );
};

export default App;
