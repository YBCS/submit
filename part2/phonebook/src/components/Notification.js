import React from 'react'

// for the errors
const Notification = ({message}) => {
  if (message === null) {
    return null 
  }
  return (
    <div className="error">
      {message}
    </div>
  )
}

export default Notification