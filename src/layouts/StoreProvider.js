import React, { useReducer } from 'react'
import reducer, { initialValue, dispatchWrapper } from '@/reducer'
import creaetCtx from '@/utils/createCtx'

const [useCtx, Provider] = creaetCtx()

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

export { useCtx as useStoreContext }

export default StoreProvider