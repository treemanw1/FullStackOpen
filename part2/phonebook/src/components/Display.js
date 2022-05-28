import React from 'react'

const Display = ({personsToShow, delete_function}) => {
    return (
        <>
        {personsToShow.map(person => <p key={person.id}>{person.name} {person.number} <button onClick={() => delete_function(person)}>delete</button></p>)}
        </>
    )
}

// const Display = ({personsToShow}) => {
//     return (
//         <>
//         {personsToShow.map(person => <p key={person.id}>{person.name} {person.number}</p>)}
//         </>
//     )
// }

export default Display