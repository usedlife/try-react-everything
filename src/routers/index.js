import React, { Suspense, lazy } from 'react'
import { Redirect } from 'react-router-dom';

const suspenseComponent = Component => props => (
  <Suspense fallback={<div>加载中...</div>}>
    <Component {...props}/>
  </Suspense>
)

export default [
  {
    path: '/',
    exact: true,
    render: () => <Redirect to="/home" />,
  },
  {
    path: '/home',
    component: suspenseComponent(lazy(() => import('../pages/Home')))
  },
  {
    path: '/recommend',
    component: suspenseComponent(lazy(() => import('../pages/Recommend')))
  },
]