// Unicafe step 4

import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Heading = ({text}) => <h1> {text} </h1>  

const Button = ({ onClick, text}) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Statistics = ({text, value}) => {
  if (text === 'positive') {
    return (
      <div> 
        {text} {value} %
      </div>  
    )
  }
  return (
    <div> 
      {text} {value}
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
  
  if (all === 0) {
    return(
      <div>
      <Heading text='give feedback' />
      <Button onClick={handleGood} text='good' />
      <Button onClick={handleNeutral} text='neutral' />
      <Button onClick={handleBad} text='bad' />
      <Heading text='statistics' />
      <>
      no feedback given
      </>
      </div>
    )
  }

  return (
    <div>
      <Heading text='give feedback' />
      <Button onClick={handleGood} text='good' />
      <Button onClick={handleNeutral} text='neutral' />
      <Button onClick={handleBad} text='bad' />
      <Heading text='statistics' />
      <Statistics text='good' value={good}/>
      <Statistics text='neutral' value={neutral}/>
      <Statistics text='bad' value={bad}/>
      <Statistics text='all' value={all}/>
      <Statistics text='average' value={(good - bad) / all }/>
      <Statistics text='positive' value={(good / all) * 100}/>
      
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
