import React from 'react'
import { useStoreContext } from '@/layouts/StoreProvider'

export default () => {
  const { state, dispatch } = useStoreContext()
  const _add = () => {
    dispatch({
      type: 'a/asyncSetCount',
      payload: state.a.count + 1
    }).then((res) => {
      console.log(res)
    })
  }
  return (
    <div>
      <span style={{margin: 10}}>{state.a.count}</span>
      <button onClick={_add}>+</button>
    </div>
  )
}