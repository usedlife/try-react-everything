import React from 'react'
import { useStore } from '@/layouts/StoreProvider'
import { useTheme } from '@/layouts/ThemeProvider';

export default () => {
  const { state, dispatch } = useStore()
  const { changeTheme } = useTheme()

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
      <div>
        <button onClick={changeTheme}>更换主题</button>
      </div>
    </div>
  )
}