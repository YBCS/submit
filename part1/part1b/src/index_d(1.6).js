// for  1.6
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = props =>  <h1>{props.value}</h1>

const Button = ({ onClick, text}) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Paragraph = props => <p>{props.value} {props.stat}</p>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  {/* arent this components inside component */}
  {/* or are they coz event handlers */}
  // no these are functions
  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  return (
    <div>
      <Header value={'give feedback'} />

      {/* <button onClick={() => setGood(good + 1)}> good </button> */}
      <Button onClick={handleGood} text={'good'} />
      <Button onClick={handleNeutral} text={'neutral'} />
      <Button onClick={handleBad} text={'bad'} />

      <Header value = {'statistics'} />

      <Paragraph value='good' stat={good} />
      <Paragraph value='neutral' stat={neutral} />
      <Paragraph value='bad' stat={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)


// I deem thee -- bad practices!
