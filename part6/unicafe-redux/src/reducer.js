const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      // const changedState = {
      //   ...state,
      //   good: state.good+1
      // }
      // console.log(changedState)
      // return changedState
      return { ...state, good: state.good + 1 }
    case 'OK':
      return { ...state, ok: state.ok + 1 }
    case 'BAD':
      return { ...state, bad: state.bad + 1 }
    case 'ZERO':
      // const changedState = {
      //   good: 0,
      //   ok: 0,
      //   bad: 0,
      // }
      // return state = changedState
      return (state = { good: 0, ok: 0, bad: 0 })
    default:
      return state
  }
}

export default counterReducer
