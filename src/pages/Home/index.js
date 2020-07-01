import React from 'react'
import { useStore } from '@/layouts/StoreProvider'
import { useTheme } from '@/layouts/ThemeProvider';

export default () => {
  const { state, dispatch } = useStore()
  const { changeTheme, theme } = useTheme()

  const _add = () => {
    dispatch({
      type: 'a/asyncSetCount',
      payload: state.a.count + 1
    }).then((res) => {
      console.log(res)
    })
  }
  return (
    <div style={{padding: '10px'}}>
      <input 
        value={state.a.count} 
        style={{
          background: theme.bg,
          color: theme.color1,
          padding: '4px 10px',
          border: `1px solid ${theme.border}`,
          outline: 'none',
          borderRadius: '4px'
        }}
      />
      <button 
        onClick={_add}
        style={{
          color: theme.bg, 
          background: theme.accent, 
          borderRadius: '4px',
          outline: 'none',
          border: 0,
          padding: '4px 8px',
          marginLeft: '10px'
        }}
      >+</button>
      <div>
        <button 
          onClick={changeTheme} 
          style={{
            color: theme.bg, 
            background: theme.accent, 
            borderRadius: '4px',
            outline: 'none',
            border: 0,
            padding: '4px 8px',
          }}
        >更换主题</button>
      </div>
    </div>
  )
}