import React, { useState, useEffect, useCallback } from 'react'

import createCtx from '@/utils/createCtx'
import theme, { isDarkTheme, ThemeType, writeNewStyle } from '@/utils/theme'

const initialThemeType = isDarkTheme() ? ThemeType.DARK : ThemeType.LIGHT
const [useCtx, Provider] = createCtx()

function ThemeProvider(props) {
  const { children } = props
  const [themeType, setThemeType] = useState(window.localStorage.getItem('theme') || initialThemeType)
  const currTheme = theme[themeType]

  const changeTheme = useCallback(() => {
    const newThemeType = themeType === ThemeType.DARK ? ThemeType.LIGHT : ThemeType.DARK
    setThemeType(newThemeType)
    window.localStorage.setItem('theme', newThemeType)
  }, [themeType])

  useEffect(() => {
    const themeListener = event => {
      if (event.matches) {
        setThemeType(ThemeType.DARK)
      } else {
        setThemeType(ThemeType.LIGHT)
      }
    }
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', themeListener)
    return () => window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', themeListener)
  }, [])

  useEffect(() => {
    writeNewStyle(theme[themeType])
  }, [themeType])

  return (
    <Provider value={{theme: currTheme, changeTheme}}>
      {children}
    </Provider>
  )
}

export { useCtx as useTheme }

export default ThemeProvider