const theme = {
  dark: {
    accent: '#B3E5FC',
    color1: '#f3f3f3',
    color2: '#ececec',
    color3: '#666',
    hover: '#666',
    border: '#e6e6e6',
    bg: '#333',
    code: '#4d4d4d',
  },
  default: {
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

const themeType = {
  DARK: 'DARK',
  LIGHT: 'LIGHT',
}

function writeNewStyle(theme) {
  const cssText = Object.keys(theme).reduce((prevs, key) => prevs += `--${key}: ${theme[key]}; `, ``)
  const style = document.createElement('style')
  style.innerText = `:root{ ${cssText} }`
  document.head.appendChild(style)
}

export let currentThemeType = isDarkTheme() ? themeType.DARK : themeType.LIGHT
export let currentTheme = currentThemeType === themeType.LIGHT ? theme.default : theme.dark

// 初始化 
writeNewStyle(currentTheme);

// 暗黑与明亮之间切换
export function changeTheme() {
  if (currentThemeType === themeType.LIGHT) {
    currentTheme = theme.dark
    currentThemeType = themeType.DARK
  } else {
    currentTheme = theme.default
    currentThemeType = themeType.LIGHT
  }
  writeNewStyle(currentTheme)
}
if (process.env.NODE_ENV === 'development') {
  window.changeTheme = changeTheme 
}

export function isDarkTheme() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
}