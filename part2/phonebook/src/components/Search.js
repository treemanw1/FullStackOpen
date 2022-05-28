import React from 'react'

const Search = ({phrase, handle}) => {
    return (
        <div>filter shown with <input value={phrase} onChange={handle}/></div>
    )
}

export default Search