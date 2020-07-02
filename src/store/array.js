export default store => dispatch => action => 
  Array.isArray(action)
    ? action.map(dispatch)
    : dispatch(action)