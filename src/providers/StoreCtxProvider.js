import React, { useReducer } from 'react'
import reducer, { initialValue, dispatchWrapper } from '@/reducer'
import createCtx from '@/utils/createCtx'

const [useCtx, Provider] = createCtx()

/**
 * 若使用此种方式一旦state更新，会导致所有用到useStore的子组件渲染，无法避免无效更新。
 */
function StoreProvider(props) {
  const {
    children
  } = props
  const [state, dispatch] = useReducer(reducer, initialValue)

  return (
    <Provider value={{ state, dispatch: dispatchWrapper(dispatch, state) }}>
      {children}
    </Provider>
  )
}

export { useCtx as useStore }

export default StoreProvider

/* 子组件使用方式 
import React from 'react'
import { useStore } from '@/providers/StoreCtxProvider'

export default () => {
  const { state, dispatch } = useStore()

  const _add = () => {
    dispatch({
      type: 'home/asyncSetCount',
      payload: state.home.count + 1
    }).then((res) => {
      console.log(res)
    })
  }
  return (
    <div style={{padding: '10px'}}>
      <input 
        value={state.home.count} 
      />
      <button 
        onClick={_add}
      >+</button>
    </div>
  )
}
*/