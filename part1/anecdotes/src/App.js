import { useState } from 'react'

const Header = (props) => <div><h1>{props.text}</h1></div>

const Button = ({name, handleClick}) => <button onClick={handleClick}>{name}</button>

const App = () => {
  const [selected, setSelected] = useState(0)
  const zero_arr = new Uint8Array(7);
  const [votes_arr, setVotes] = useState(zero_arr)

  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const randomChooser = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const updateVotes = (index) => {
    const copy = [...votes_arr]
    copy[index] += 1
    setVotes(copy)
  }

  const highest_no_votes = Math.max.apply(Math, votes_arr)
  const highest_index = votes_arr.indexOf(highest_no_votes)

  return (
    <div>
      <Header text='Anecdote of the day'/>
      <p>{anecdotes[selected]}</p>
      <p>has {votes_arr[selected]} votes</p>
      <Button name='vote' handleClick={() => updateVotes(selected)}/>
      <Button name='next anecdote' handleClick={() => randomChooser()}/>
      <Header text='Anecdote with the most votes'/>
      <p>{anecdotes[highest_index]}</p>
      <p>has {highest_no_votes} votes</p>
    </div>
  )
}

export default App