  import React from "react";

const Persons = ({ persons, delPerson }) => {
  return (
    <>
      {persons.map(person => (
        <li className='person' key={person.name}>
          {person.name} {person.number}
          <button
                  onClick={() => {
                    if(window.confirm(`Are you sure you want to delete ${person.name}?`)){
                    delPerson(person.id)}
                  }}
                >
                  Delete
                </button>
        </li>
      ))}
    </>
  );
};

export default Persons