import React from 'react'

const Form = (props) => {
    return (
        <form>
        <div>Name: <input value={props.newName} onChange={props.handleInputNameChange}/></div>
        <div>Number: <input value={props.newNumber} onChange={props.handleInputNumberChange}/></div>
        {/* <div><button type="submit" onClick={() => props.addNewName(props.newName)}>add</button></div>  */}
        <div><button type="submit" onClick={props.addNewName}>add</button></div>
      </form>
    )
}

export default Form