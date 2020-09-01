// this page defines all the hooks
import { useState } from 'react'

// i'm using name instead of type... is it ok ?
export const useField = (name) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  // const onReset = () => {
  //   setValue('')
  // }
  const onReset = () => setValue('')

  // return {
  //   name,
  //   value,
  //   onChange
  // }

  return {
    name,
    value,
    onChange,
    onReset,
  }
}

// modules can have several named exports
export const useAnotherHook = () => {
  // ...
}