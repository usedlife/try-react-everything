import React from 'react'
import { HashRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import routers from './routers'
import StoreProvider from '@/layouts/StoreProvider'

function App() {
  return (
    <HashRouter>
      <StoreProvider>
        {renderRoutes(routers)}
      </StoreProvider>
    </HashRouter>
  ) 
}

export default App
