// /bloglist-frontend/src/components/Togglable.js
// import React, { useState, useImperativeHandle } from 'react'
import React, { useImperativeHandle } from 'react'
import { setVisible } from '../reducers/visibleReducer'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'

const Togglable = React.forwardRef((props, ref) => {
  const dispatch = useDispatch()
  const visible = useSelector((state) => state.visible)
  // const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    dispatch(setVisible(visible))
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button variant='primary' onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible} className='togglableContent'>
        {props.children}
        <Button variant='primary' onClick={toggleVisibility}>
          cancel
        </Button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable
