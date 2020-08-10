import React from 'react'
// import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  // const dispatch = useDispatch()
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    // dispatch(createAnecdote(content))
    // dispatch(setNotification(`created an anecdote '${content}'`, 5))
    props.createAnecdote(content)
    props.setNotification(`created an anecdote '${content}'`, 5)
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          {/* uncontrolled */}
          <input name='anecdote' />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

// const mapStateToProps = {

// }

const mapDispatchToProps = {
  createAnecdote,
  setNotification
}

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)
