function error(error) {
  throw error
}

export default store => dispatch => action => 
  typeof action.then === 'function'
    ? Promise.resolve(action).then(dispatch, error)
    : dispatch(action)