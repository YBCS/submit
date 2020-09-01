import loginService from '../services/login'
import storage from '../utils/storage'
import { setNotification } from '../reducers/notificationReducer'

const loginReducer = (STATE = null, action) => {
  switch (action.type) {
    case 'INIT_USER': {
      return action.data
    }
    case 'LOGIN': {
      return action.data
    }
    case 'SET_USER': {
      return action.data
    }
    default: {
      return STATE
    }
  }
}

export const initializeUser = () => {
  const data = storage.loadUser()
  return {
    type: 'INIT_USER',
    data,
  }
}

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const data = await loginService.login(credentials)
      storage.saveUser(data)
      // console.log('data in action ', data)
      dispatch(
        setNotification({
          message: `${data.name} welcome back!`,
          type: 'success',
        }, 5)
      )
      dispatch({
        type: 'LOGIN',
        data,
      })
    } catch(e) {
      dispatch(
        setNotification({
          message: 'wrong username/password',
          type: 'error',
        }, 5)
      )
    }
  }
}

export const setUser = (data) => {
  // nothing async about this
  return async (dispatch) => {
    if (data === null) {
      storage.logoutUser()
    }
    dispatch({
      type: 'SET_USER',
      data,
    })
  }
}

export default loginReducer
