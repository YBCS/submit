const VisibleReducer = (STATE = false, action) => {
  switch(action.type) {
    case 'SET_VISIBILITY':
      return !action.visible
    default:
      return STATE
  }
}

export const setVisible = (visible) => {
  return async (dispatch) => {
    await dispatch({
      type: 'SET_VISIBILITY',
      visible
    })
  }
}

export default VisibleReducer