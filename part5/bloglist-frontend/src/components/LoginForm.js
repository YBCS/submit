import React from 'react'
// import Notification from './Notification'
import PropTypes from 'prop-types'

const LoginForm = ({
  // notification,
  handleLogin,
  username,
  handleUsernameChange,
  password,
  handlePasswordChange,
}) => {
  return (
    <div>
      <h2>Log in application </h2>
      {/* <Notification notification={notification} /> */}
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id='username'
            type='text'
            value={username}
            name='Username'
            // onChange={({ target }) => setUsername(target.value)}
            onChange={handleUsernameChange} // potential change
          />
        </div>
        <div>
          password
          <input
            id='password'
            type='password'
            value={password}
            name='Password'
            // onChange={({ target }) => setPassword(target.value)}
            onChange={handlePasswordChange} // potential change
          />
        </div>
        <button id='login-button' type='submit'>
          login
        </button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  // notification: PropTypes.object.isRequired,
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default LoginForm
