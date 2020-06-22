export default {
  namespace: 'b',
  state: {
    count: 100,
  },
  reducers: {
    setCount(state, action){
      return { ...state, count: action.payload }
    }
  },
  effects: {
    asyncSetCount(dispatch, state, action) {
      setTimeout(() => {
        dispatch({ type: 'b', payload: state.count - 1 })
      }, 2000)
    }
  }
}