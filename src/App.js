import React from 'react'
import { HashRouter } from 'react-router-dom'
import BaseLayout from './layouts/BaseLayout'
import { renderRoutes } from 'react-router-config'
import routers from './routers'

function App() {
  return (
    <HashRouter>
      <BaseLayout>
        {renderRoutes(routers)}
      </BaseLayout>
    </HashRouter>
  ) 
}

export default App
