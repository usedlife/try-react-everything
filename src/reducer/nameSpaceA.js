const delay = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

export default {
  namespace: 'a',
  state: {
    count: 1,
  },
  reducers: {
    setCount(state, action){
      return { ...state, count: action.payload }
    }
  },
  effects: {
    async asyncSetCount(dispatch, state, action) {
      await delay(2000)
      dispatch({ type: 'a/setCount', payload: state.count + 1 })
      return 200
    }
  }
}