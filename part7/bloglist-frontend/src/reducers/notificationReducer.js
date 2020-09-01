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
