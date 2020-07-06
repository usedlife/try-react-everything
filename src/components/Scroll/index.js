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
    if(!bScroll || !onScroll) return;
    bScroll.on('scroll', (scroll) => {
      onScroll(scroll);
    })
    return () => {
      bScroll.off('scroll');
    }
  }, [onScroll, bScroll]);

  useEffect(() => {
    if(!bScroll || !pullUp) return;
    bScroll.on('scrollEnd', () => {
      // 判断是否滑动到了底部
      if(bScroll.y <= bScroll.maxScrollY + 100){
        pullUp();
      }
    });
    return () => {
      bScroll.off('scrollEnd');
    }
  }, [pullUp, bScroll]);

  useEffect(() => {
    if(!bScroll || !pullDown) return;
    bScroll.on('touchEnd', (pos) => {
      // 判断用户的下拉动作
      if(pos.y > 50) {
        pullDown();
      }
    });
    return () => {
      bScroll.off('touchEnd');
    }
  }, [pullDown, bScroll]);

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
  direction: PropTypes.oneOf(['vertical', 'horizontal', 'free']),
  onScroll: PropTypes.func,
  pullDown: PropTypes.func,
  pullUp: PropTypes.func,
}

Scroll.defaultProps = {
  direction: 'vertical'
}

export default Scroll