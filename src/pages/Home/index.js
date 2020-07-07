import React from 'react'
import { connect } from 'react-redux'
import { useTheme } from '@/providers/ThemeProvider';

const Home = (props) => {
  const { changeTheme, theme } = useTheme()
  const { count, dispatch } = props
  const _add = () => {
    dispatch({
      type: 'home/asyncSetCount',
      payload: count + 1
    }).then((res) => {
      console.log(res)
    })
  }
  return (
    <div style={{padding: '.1rem'}}>
      <input 
        value={count} 
        style={{
          background: theme.bg,
          color: theme.color1,
          padding: '.04rem .1rem',
          border: `.01rem solid ${theme.border}`,
          outline: 'none',
          borderRadius: '.04rem'
        }}
      />
      <button 
        onClick={_add}
        style={{
          color: theme.bg, 
          background: theme.accent, 
          borderRadius: '.04rem',
          outline: 'none',
          border: 0,
          padding: '.04rem .08rem',
          marginLeft: '.1rem'
        }}
      >+</button>
      <div>
        <button 
          onClick={changeTheme} 
          style={{
            color: theme.bg, 
            background: theme.accent, 
            borderRadius: '.04rem',
            outline: 'none',
            border: 0,
            padding: '.04rem .08rem',
          }}
        >更换主题</button>
      </div>
    </div>
  )
}

export default connect(
  ({ home }) => ({ 
    count: home.count 
  }),
)(Home)