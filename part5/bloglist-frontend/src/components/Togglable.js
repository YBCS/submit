import React, {  useState } from 'react'

const Toggleable = (props) => {
  const [visible, setVisible] = useState(false)

  // this is the false aka base condition
  const hideWhenVisible = { dispaly: visible ? 'none' : '' }
  const showWhenVisible = { dispaly: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {/* this can be whatever */}
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
}

export default Toggleable