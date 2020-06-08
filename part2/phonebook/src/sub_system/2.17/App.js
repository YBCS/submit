// 2.17
// implement delete -- complete
// learned --
//  update the state of persons once you've deleted
//  filtered person maybe copy of persons but delete request is to localhost/persons/id so its ok  

import React, { useState, useEffect } from "react"
// import axios from "axios"

import PersonForm from "./components/PersonForm"
import Person from "./components/Person"
import Filter from "./components/Filter"

import personService from "./services/persons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [newSearch, setSearch] = useState("")

  useEffect(() => {
    console.log("effect")
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    var dupli = false
    persons.forEach((person) => {
      if (person.name === newName) {
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

      personService.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson))
        setNewName("")
        setNewNumber("")
      })
    }
  }

  const handleNewName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNewNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleSearch = (event) => {
    setSearch(event.target.value)
    console.log(event.target.value)
  }
  const handleDeleteOf = (person) => {
    // this fucked me up 
    if (window.confirm(`Delete ${person.name} ?`)){
      personService.remove(person).then(response => {
        console.log(response)
        personService.getAll().then((updatedPersons) => {
          setPersons(updatedPersons)
        })
        console.log(persons)
    }  
    )}
}

  // where is the right place to define this
  const filteredPerson = persons.filter((person) => {
    return person.name.toLowerCase().includes(newSearch.toLowerCase())
  })
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
      
      {filteredPerson.map((person) => (
        <Person 
          key={person.name} 
          person={person} 
          // handleDelete={() => handleDeleteOf(person.id)}
          handleDelete={() => handleDeleteOf(person)}
        />      
      ))}
    </div>
  )
}

export default App
