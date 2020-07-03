function error(error) {
  throw error
}

export default store => next => action => 
  typeof action.then === 'function'
    ? Promise.resolve(action).then(next, error)
    : next(action)