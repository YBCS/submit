import React from "react";

// const Person = ({ person, handleDelete }) => (
const Person = ({ person }) => (
  <div>
    {person.name} {person.number}
    {/* add button here */}
    {/* <button onClick={handleDelete}> delete </button> */}
    <button > delete </button>
  </div>
);

// const Persons = ({ persons, handleDelete }) => {
const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map((person) => (
        // <Person key={person.name} person={person} handleDelete={handleDelete}/>
        <Person key={person.name} person={person} />
      ))}
    </div>
  );
};

export default Persons;
