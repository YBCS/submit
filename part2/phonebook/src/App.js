// 2.18
// update old no with new if name same
// change in {addPerson}

// id not fixing itself as delete a peson obj
// change in {handleDeleteOf}

import React, { useState, useEffect } from "react"

import PersonForm from "./components/PersonForm"
import Person from "./components/Person"
import Filter from "./components/Filter"

import personService from "./services/persons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [newSearch, setSearch] = useState("")

  const update_persons = () => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons)
    })
  }

  useEffect(() => {
    update_persons()
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    var dupli = false
    var id = 0
    const newPerson = {
      name: newName,
      number: newNumber,
    }
    persons.forEach((person) => {
      if (person.name === newName) {
        dupli = true
        id = person.id
      }
    })
    // console.log(id)
    if (dupli) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with new one?`
        )
      ) {
        personService.update(id, newPerson).then((returnedPerson) => {
          console.log(returnedPerson)
          update_persons()
          setNewName("")
          setNewNumber("")
        })
      }
    } else {
      console.log("button clicked", event.target)
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
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService.remove(person).then((response) => {
        // console.log(response)
        // fix id
        update_persons()
        // console.log(persons)
      })
    }
  }

  const filteredPerson = persons.filter((person) => {
    return person.name.toLowerCase().includes(newSearch.toLowerCase())
  })

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
          handleDelete={() => handleDeleteOf(person)}
        />
      ))}
    </div>
  )
}

export default App
