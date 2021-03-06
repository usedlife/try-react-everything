import React from 'react'
import { HashRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import routers from './routers'
import StoreProvider from '@/providers/StoreProvider'
import ThemeProvider from '@/providers/ThemeProvider'

function App() {
  return (
    <HashRouter>
      <ThemeProvider>
        <StoreProvider>
          {renderRoutes(routers)}
        </StoreProvider>
      </ThemeProvider>
    </HashRouter>
  )
}

export default App
