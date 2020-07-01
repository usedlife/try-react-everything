const theme = {
  DARK: {
    accent: '#B3E5FC',
    color1: '#f3f3f3',
    color2: '#ececec',
    color3: '#666',
    hover: '#666',
    border: '#e6e6e6',
    bg: '#333',
    code: '#4d4d4d',
  },
  LIGHT: {
    accent: '#01579B',
    color1: '#333',
    color2: '#555',
    color3: '#f3f3f3',
    hover: '#B3E5FC',
    border: '#e6e6e6',
    bg: '#fff',
    code: '#f3f3f3',
  }
}

const ThemeType = {
  DARK: 'DARK',
  LIGHT: 'LIGHT',
}

// 将样式变为全局css
function writeNewStyle(theme) {
  const oldStyle = document.querySelector('.--app-theme-class')
  if (oldStyle) {
    oldStyle.parentNode.removeChild(oldStyle)
  }

  const cssText = Object.keys(theme).reduce((prevs, key) => prevs += `--${key}: ${theme[key]}; `, ``)
  const style = document.createElement('style')
  style.setAttribute('class', '--app-theme-class')
  style.innerText = `:root{ ${cssText} }`
  document.head.appendChild(style)
}

// 检测用户手机是否开启暗黑模式
function isDarkTheme() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
}

export { 
  isDarkTheme,
  ThemeType,
  writeNewStyle,
}

export default theme