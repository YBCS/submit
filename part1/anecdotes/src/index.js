// anectdotes step 3
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text}) => (
    <>
    <button onClick={onClick}>
    {text}
    </button>
    </>
)

const Header = ({text}) => (<h1>{text}</h1>)
const Vote = ({vote}) => (<div>has {vote} votes</div>)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const generateZero = (max) => Array.apply(null, new Array(max)).map(Number.prototype.valueOf,0)
  const [votes, setVotes] = useState(generateZero(anecdotes.length))
  const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max))
  const handleClick = () => setSelected(getRandomInt(anecdotes.length))
  const handleVotes = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  } 

  console.log("selected is ",selected)
  console.log("votes array is",votes)
  // console.log(votes.indexOf(Math.max(...votes)))
  const indexVote = votes.indexOf(Math.max(...votes))
  return (
    <div>
      <Header text={"Anecdote of the day"}/>
      {props.anecdotes[selected]}
      <Vote vote={votes[selected]}/>
      <Button onClick={handleVotes} text={'vote'}/>
      <Button onClick={handleClick} text={'next anecdote'}/>
      <Header text={"Anecdote with most votes"}/>
      {props.anecdotes[indexVote]}
      <Vote vote={votes[indexVote]}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
