import { useState } from 'react'

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Button = ({name, handleClick}) => <button onClick={handleClick}>{name}</button>

const StatisticLine = ({text, value}) => <p>{text} {value}</p>

const Statistics = ({good, neutral, bad}) => {
  const total = good + bad + neutral
  if (good===0 && neutral===0 && bad===0) {
    return (
      <>No feedback given</>
    )
  }
  // return (
  // <>
  //   <StatisticLine text='good' value={good}/>
  //   <StatisticLine text='neutral' value={neutral}/>
  //   <StatisticLine text='bad' value={bad}/>
  //   <StatisticLine text='all' value={total}/>
  //   <StatisticLine text='average' value={(good-bad)/total}/>
  //   <StatisticLine text='positive' value={good/total}/>
  // </>
  // )
  return (
    <table>
      <tbody>
      <tr>
        <td>good</td>
        <td>{good}</td>
      </tr>
      <tr>
        <td>neutral</td>
        <td>{neutral}</td>
      </tr>
      <tr>
        <td>bad</td>
        <td>{bad}</td>
      </tr>
      <tr>
        <td>all</td>
        <td>{total}</td>
      </tr>
      <tr>
        <td>average</td>
        <td>{(good-bad)/total}</td>
      </tr>
      <tr>
        <td>positive</td>
        <td>{good/total}</td>
      </tr>
      </tbody>
      </table>
  )

}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const updateValue = ([rating, setter]) => {
    console.log('test', rating)
    setter(rating+1)
  }

  return (
    <div>
      <Header course='give feedback'/>
      <Button name='good' handleClick={() => updateValue([good, setGood])}/>
      <Button name='neutral' handleClick={() => updateValue([neutral, setNeutral])}/>
      <Button name='bad' handleClick={() => updateValue([bad, setBad])}/>
      <Header course='statistics'/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App