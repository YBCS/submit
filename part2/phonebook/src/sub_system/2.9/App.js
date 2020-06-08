// 2.9      -- not done yet
// implement the search

import React, { useState } from "react";

const PersonForm = ({
  addPerson,
  newName,
  handleNewName,
  newNumber,
  handleNewNumber,
}) => {
  return (
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
  );
};

const Person = ({ person }) => (
  <div>
    {person.name} {person.number}
  </div>
);

const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map((person) => (
        <Person key={person.name} person={person} />
      ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  // const [newSearch, setNewSearch] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    var dupli = false;
    persons.forEach(function (item, index) {
      console.log(item, index);
      if (newName === item.name) {
        dupli = true;
        window.alert(`${newName} is already added to phonebook`);
      }
    });
    if (!dupli) {
      console.log("button clicked", event.target);
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      setPersons(persons.concat(newPerson));
    }
  };

  const handleNewName = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };
  const handleNewNumber = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };
  // const handleNewSearch = (event) => {
  //   console.log(event.target.value);
  //   setNewSearch(event.target.value);
  //   // search logic here
  //   let newList = []
  //   newList =  persons.filter((person) => {
  //       const lower = person.name.toLowerCase()
  
  //       if (lower.includes(event.target.value.toLowerCase())) {
  //           newList.push(person)
  //       }
  //   })
  
  //   console.log(newList)
  // };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={}/>
      </div>
      <h2>add  a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNewName={handleNewName}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  );
};

export default App;

