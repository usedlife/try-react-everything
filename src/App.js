import React from 'react'
import { HashRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import routers from './routers'

function App() {
  return (
    <HashRouter>
      {renderRoutes(routers)}
    </HashRouter>
  ) 
}

export default App
