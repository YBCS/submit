// Unicafe step 1

import React, { useState } from 'react'
import ReactDOM from 'react-dom'

// const Heading = (props) => {
//   return (
//     <h1> {props.text} </h1>  
//   )
// }

const Heading = ({text}) => <h1> {text} </h1>  

const Button = ({ onClick, text}) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Stat = ({text, value}) => {
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

  console.log('good...', good)
  return (
    <div>
      <Heading text='give feedback' />
      <Button onClick={handleGood} text='good' />
      <Button onClick={handleNeutral} text='neutral' />
      <Button onClick={handleBad} text='bad' />
      <Heading text='statistics' />
      <Stat text='good' value={good}/>
      <Stat text='neutral' value={neutral}/>
      <Stat text='bad' value={bad}/>
      
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
