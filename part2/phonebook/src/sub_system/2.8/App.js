// 2.8

import React, { useState } from 'react'


const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')


    const addPerson = (event) => {
        event.preventDefault()

        var dupli = false
        persons.forEach(function (item, index) {
            console.log(item, index)
            if (newName === item.name) {
                dupli = true
                window.alert(`${newName} is already added to phonebook`)
            }
        })

        if (!dupli) {
            console.log('button clicked', event.target)
            const newPerson = {
                name: newName,
                number: newNumber
            }
            setPersons(persons.concat(newPerson))
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

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addPerson}>
                <div>
                    name: <input value={newName} onChange={handleNewName} />
                </div>
                <div>
                    number: <input value={newNumber} onChange={handleNewNumber} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>

            {persons.map((person) =>
                <div key={person.name}> {person.name} {person.number} </div>
            )}

            {/* <div>debug: {newName}</div> */}

        </div>
    )
}

export default App