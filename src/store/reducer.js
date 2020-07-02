import _models from './models'
const models = {}
const initialValue = {}
_models.loading = {
  namespace: 'loading',
  state: {}, 
  reducers: {
    CHANGE_LOADING(state, { actionType, data }) {
      return { ...state, [actionType]: data }
    }
  }
}

Object.keys(_models).forEach(key => {
  const namespace = _models[key].namespace
  models[namespace] = _models[key]
  initialValue[namespace] = _models[key].state
})

function reducer(state = initialValue, action) {
  try {
    if (action.type === '@@INIT') {
      return state
    }
    const [namespace, methodName] = action.type.split('/')
    return {
      ...state,
      [namespace]: { ...models[namespace].reducers[methodName](state[namespace], action) }
    }
  } catch(e) {
    console.log("reducer错误：", e)
    return { ...state }
  }
}

const asyncDispatch = store => dispatch => async action => {
  try {
    const [namespace, methodName] = action.type.split('/')
    const method = models[namespace].effects[methodName]
    const state = store.getState()
    if (method) {
      dispatch({ type: 'loading/CHANGE_LOADING', actionType: action.type, data: true })
      const result = await method(dispatch, state[namespace], action)
      dispatch({ type: 'loading/CHANGE_LOADING', actionType: action.type, data: false })
      return Promise.resolve(result)
    } else {
      dispatch(action)
    }
  } catch(e) {
    console.log("effect错误：", e)
  }
} 

export { 
  initialValue,
  asyncDispatch,
}

export default reducer