import React from 'react'

const Search = ({phrase, handle}) => {
    return (
        <div>find countries <input value={phrase} onChange={handle}/></div>
    )
}

export default Search