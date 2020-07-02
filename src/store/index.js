import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import promise from './promise'
import array from './array'
import reducer, { asyncDispatch } from './reducer'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancer(applyMiddleware(thunk, promise, array, asyncDispatch)),
)

export default store