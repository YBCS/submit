// 2.20
// add async fix -- two browser open and not reloaded 
// show error when user try to delete data already removed from browser
// cannot get that color change logic
// can't figure this out 

import React, { useState, useEffect } from "react"

import PersonForm from "./components/PersonForm"
import Person from "./components/Person"
import Filter from "./components/Filter"
import Notification from "./components/Notification"


import personService from "./services/persons"
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [newSearch, setSearch] = useState("")
  const [errorMessage, setErrorMessage] = useState(null)

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
        personService.update(id, newPerson)
        .then((returnedPerson) => {
          console.log(returnedPerson)
          setErrorMessage(`Number changed to ${returnedPerson.number}`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
          update_persons()
          setNewName("")
          setNewNumber("")
        })
        .catch(error => {
          setErrorMessage(`Information of ${newPerson.name} has already been removed from server`)
          update_persons()
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
        })
      }
    } else {
      console.log("button clicked", event.target)
      personService.create(newPerson).then((returnedPerson) => {
        setErrorMessage(`Added ${returnedPerson.name}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
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
      personService.remove(person)
      .then((response) => {
        // console.log(response)
        update_persons()
        // console.log(persons)
      })
      .catch(error => {
        setErrorMessage(`Information of ${person.name} has already been removed from server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
        update_persons()
      })
    }
  }

  const filteredPerson = persons.filter((person) => {
    return person.name.toLowerCase().includes(newSearch.toLowerCase())
  })

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={errorMessage}/>

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
