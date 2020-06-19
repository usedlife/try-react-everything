import React from 'react'
import styles from './style.module.scss'

export default (props) => {
  const { children } = props
  return (
    <div className={styles['main-container']}>
      {children}
    </div>
  )
}