var countdown = undefined

const notificationReducer = (STATE = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    case 'REMOVE_NOTIFICATION':
      return action.notification
    default:
      return STATE
  }
}

export const setNotification = (notification, time) => {
  return async (dispatch) => {
    clearTimeout(countdown)
    await dispatch({
      type: 'SET_NOTIFICATION',
      notification,
    })
    countdown = setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICATION',
        notification: null,
      })
    }, time * 1000)

  }
}


export default notificationReducer



// note : I think set and remove can be done with just one action
// I mean just set as null in the SET_NOTIFICATION

// export const setNotification = (notification, time) => {
//   return async (dispatch) => {
//     dispatch({
//       type: 'SET_NOTIFICATION',
//       notification,
//     })
//     setTimeout(() => {
//       dispatch({
//         type: 'REMOVE_NOTIFICATION',
//         notification: null
//       })
//       // have to cancel this somehow
//     }, time * 1000)
//   }
// }