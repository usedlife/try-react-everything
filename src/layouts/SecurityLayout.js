import React from 'react'
import styles from './style.module.scss'
import { renderRoutes } from 'react-router-config'

export default (props) => {
  const { route } = props
  // TODO: 是否登陆判断
  return (
    <div className={styles['main-container']}>
      {renderRoutes(route.routes)}
    </div>
  )
}