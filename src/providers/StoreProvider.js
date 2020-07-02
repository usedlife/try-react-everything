import React, { useReducer } from 'react'
import reducer, { initialValue, dispatchWrapper } from '@/reducer'
import creaetCtx from '@/utils/createCtx'

const [useCtx, Provider] = creaetCtx()

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