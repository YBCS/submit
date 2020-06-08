import React from "react";


const Person = ({ person, handleDelete }) => (
  <div>
    {person.name} {person.number}
    <button onClick={handleDelete}> delete </button>
  </div>
)


export default Person;









// const RenderPerson =({persons}) => {
//   return (
//     {persons.map((person) => (
//       <div>
//         {person.name} {person.number}
//       </div>
//     ))}
//   )
// }

// const RenderFiltered =({filteredPerson}) => {
//   filteredPerson.map((person) => (
//     <div>
//       {person.name} {person.number}
//     </div>
//   ))
// }

// const Person = ({ newSearch, persons, filteredPerson }) => (
//   <div>
//     if({newSearch}) {
//       <RenderFiltered filteredPerson={filteredPerson}/>
//     } else {
//       <RenderPerson persons={persons}/>
//     }
//   </div>
// )