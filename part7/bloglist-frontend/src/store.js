import { createStore, combineReducers, applyMiddleware } from 'redux'
// import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import notificationReducer from './reducers/notificationReducer'
import visibleReducer from './reducers/visibleReducer'
import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'

const reducer = combineReducers({
  blogs: blogReducer,
  user: loginReducer,
  notification: notificationReducer,
  visible: visibleReducer,
})

const store = createStore(
  reducer,
  // notificationReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store
