/*
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
]

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  }
}

const initialState = anecdotesAtStart.map(asObject)
*/

// const getId = () => (100000 * Math.random()).toFixed(0)

import anecdoteService from '../services/anecdotes'

// const anecdoteReducer = (state = initialState, action) => {
const anecdoteReducer = (state = [], action) => {
  // console.log('state now: ', state)
  // console.log('action', action)

  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      // maybe find from state.anecdotes -- not using useDispatch
      const anecdoteToVote = state.find((a) => a.id === id)
      const changedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1,
      }
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

// action creators
// export const clickVote = (id) => {
//   // define anecdoteService for .updateLike
//   // convert this function to thunk async
//   return {
//     type: 'VOTE',
//     data: { id },
//   }
// }

export const clickVote = (anecdote) => {
  // define anecdoteService for .updateLike
  // convert this function to thunk async
  return async (dispatch) => {
    const id = anecdote.id
    // const res = await anecdoteService.update(id, anecdote) // mistake
    await anecdoteService.update(id, {
      ...anecdote,
      votes: anecdote.votes + 1,
    })
    dispatch({
      type: 'VOTE',
      data: { id },
    })
  }
}

export const createAnecdote = (data) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create(data)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

// export const createAnecdote = (data) => {
//   return {
//     type: 'NEW_ANECDOTE',
//     data
//   }
// }

// thunk here
export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export default anecdoteReducer
