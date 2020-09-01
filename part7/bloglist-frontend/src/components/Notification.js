// /bloglist-frontend/src/components/Notification.js
import React from 'react'
// import { Alert } from 'react-bootstrap'

const Notification = ({ notification }) => {
  if ( !notification ) {
    return null
  }

  const style = {
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    color: notification.type === 'success' ? 'green' : 'red',
    background: 'lightgrey'
  }

  return <div style={style}>
    {notification.message}
  </div>
  // return <Alert variant={notification.type}>
  //   {notification.message}
  // </Alert>
}

export default Notification