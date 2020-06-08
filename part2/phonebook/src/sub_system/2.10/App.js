// 2.9      -- not done yet -- done I guess
// refactored -- component separated (2.10) -- yet separate files tho
// implement the search -- done
// 2.10 done 

import React, { useState } from "react";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setSearch] = useState("");

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
    // something still wrong here 
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
  const handleSearch = (event) => {
    setSearch(event.target.value);
    console.log(event.target.value);
  };

  // where is the right place to define this
  const filteredPerson = persons.filter((person) => {
    return person.name.toLowerCase().includes(newSearch.toLowerCase());
  });

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
