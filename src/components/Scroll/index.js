import React, { forwardRef, useImperativeHandle, useRef, useEffect, useState } from 'react'
import BScroll from '@better-scroll/core'
import PropTypes from 'prop-types'

import styles from './styles.module.scss'

const Scroll = forwardRef((props, ref) => {
  const scrollContainerRef = useRef() 
  const [bScroll, setBScroll] = useState()
  const { 
    direction, 

    onScroll,
    pullDown,
    pullUp,
    ...rest 
  } = props

  useEffect(() => {
    const bScroll = new BScroll(scrollContainerRef.current, {
      scrollX: direction === "horizontal",
      scrollY: direction === "vertical",
      freeScroll: direction === 'free',
      probeType: 3,
      click: true,
      ...rest,
    })
    setBScroll(bScroll)
    return () => setBScroll(null)
  }, [])

  useEffect(() => {
    if (!bScroll || !onScroll) return 
    bScroll.on('scroll', () => {
      onScroll()
    })
  }, [bScroll, onScroll])

  useImperativeHandle(ref, () => ({
    refresh() {
      bScroll.refresh()
    },
    getBScroll() {
      return bScroll
    }
  }))

  return (
    <div className={styles.scroll_container} ref={scrollContainerRef}>
      <div>{props.children}</div>
    </div>
  )
})

Scroll.propTypes = {
  direction: PropTypes.oneOf(['vertical', 'horizontal', 'free'])
}

Scroll.defaultProps = {
  direction: 'vertical'
}

export default Scroll