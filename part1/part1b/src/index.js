// for  1.8

import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = props =>  <h1>{props.value}</h1>

const Paragraph = props => <div>{props.value} {props.stat}</div>

const Button = ({ onClick, text}) => (
  <button onClick={onClick}>
    {text}
  </button>
)

// a proper place to define a component
const Statistics = (props) => {
  return (
    <>
      <Paragraph value='good' stat={good} /> 
      <Paragraph value='neutral' stat={neutral} />
      <Paragraph value='bad' stat={bad} />
    
      <Paragraph value='all' stat={all} />
      <Paragraph value='average' stat={average} />
      <Paragraph value='positive' stat={positive} />
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGood = () => {
    setAll(all + 1)
    setGood(good + 1)
    console.log('good ',good)
    console.log('all ',all)
    handleAverage()
    handlePositive()
  } 
  const handleNeutral = () => {
    setAll(all + 1)
    setNeutral(neutral + 1)
    console.log('neutral', neutral)
    console.log('all ',all)
    // handleAverage()
    handlePositive()
  }
  const handleBad = () => {
    setAll(all + 1)
    setBad(bad + 1)
    console.log('bad', bad)
    console.log('all ',all)
    handleAverage()
    handlePositive()
  }

  const handleAverage = () => setAverage( ( (good+1) - (bad+1) ) / (all+1) )

  const handlePositive = () => setPositive((good+1)/(all+1))

  return (
    <div>
      <Header value={'give feedback'} />

      {/* <button onClick={() => setGood(good + 1)}> good </button> */}
      <Button onClick={handleGood} text={'good'} />
      <Button onClick={handleNeutral} text={'neutral'} />
      <Button onClick={handleBad} text={'bad'} />

      <Header value = {'statistics'} />

    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)

