import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import { connect } from 'react-redux'
import { clickVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const byVotes = (a1, a2) => a2.votes - a1.votes

  // i coudnt pass this coz it expects a referece
  //  to a function and not a function directly
  const handleVote = (anecdote) => {
    props.clickVote(anecdote)
    // props.setNotification(`you voted '${anecdote.content}'`, 5)
    props.setNotification(`you voted '${anecdote.content}'`, 3)

    // const value = props.setNotification(`you voted '${anecdote.content}'`, 5)
    // console.log('timout id ? ',value)
  }

  return (
    <div>
      {props.anecdotes.sort(byVotes).map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            {/* <button onClick={() => vote(anecdote.id)}>vote</button> */}
            {/* whew! why couldnt I figure this out */}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
  }
}

const mapDispatchToProps = {
  clickVote,
  setNotification,
}

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

// export default AnecdoteList
export default ConnectedAnecdotes
