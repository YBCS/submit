// Unicafe step 6 (1.11)
// add tables 
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({text}) => <h1>{text}</h1>

const Button = ({ onClick, text}) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Heading = ({handleGood, handleNeutral, handleBad}) => {
  return (
    <div>
      <Header text='give feedback'/>
      <Button onClick={handleGood} text='good' />
      <Button onClick={handleNeutral} text='neutral' />
      <Button onClick={handleBad} text='bad' />
      <Header text='statistics'/>
    </div>
  )
}


const Statistic = ({text, value}) => {
  if (text === 'positive') {
    return (
        <tr>
            <td>{text}</td> 
            <td>{value} %</td> 
        </tr>
    )
  }
  return (
    <tr>
        <td>{text}</td> 
        <td>{value}</td> 
    </tr>  
  )
}

const Statistics = ({good, neutral, bad, all}) => {
  if (all === 0) {
    return (
      <div>
        no feedback given
      </div>
    )
  }
  return (
    <div>
      <table>
          <thead></thead>
          <tbody>
            <Statistic text='good' value={good} />
            <Statistic text='neutral' value={neutral} />
            <Statistic text='bad' value={bad} />
            <Statistic text='all' value={all} />

            <Statistic text='average' value={(good - bad) / all} />
            <Statistic text='positive' value={(good / all) * 100} />
          </tbody>
          <tfoot></tfoot>
      </table> 
    </div>  
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  const all = good + neutral + bad
  console.log('good...', good)

  return (
    <div>
      <Heading handleGood={handleGood} handleNeutral={handleNeutral} handleBad={handleBad} />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)


// almost all are good practices and maintainable 
