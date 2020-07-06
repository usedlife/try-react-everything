import React from 'react'

import { Scroll } from '@/components'
import styles from './styles.module.scss'

export default () => {
  return (
    <div className={styles.wrapper}>
      <Scroll>
        <h1>better-scroll 配置项</h1>
        <p>BetterScroll 支持很多参数配置，可以在初始化的时候传入第二个参数，比如：</p>
        <code>{`
        import BScroll from '@better-scroll/core'
        let scroll = new BScroll('.wrapper',{
            scrollY: true,
            click: true
        })`}</code>
        <p>这样就实现了一个具有纵向可点击的滚动效果的列表。BetterScroll 支持的参数非常多，接下来我们来列举 BetterScroll 支持的参数。</p>
        <h2>startX</h2>
        <ul>
          <li>类型：Number</li>
          <li>默认值：0</li>
          <li>作用：横轴方向初始化位置。</li>
        </ul>
        <h2>startY</h2>
        <ul>
          <li>类型：Number</li>
          <li>默认值：0</li>
          <li>作用：纵轴方向初始化位置。</li>
        </ul>
        <h2>startX</h2>
        <ul>
          <li>类型：Number</li>
          <li>默认值：0</li>
          <li>作用：横轴方向初始化位置。</li>
        </ul>
        <h2>startY</h2>
        <ul>
          <li>类型：Number</li>
          <li>默认值：0</li>
          <li>作用：纵轴方向初始化位置。</li>
        </ul>
        <h2>startX</h2>
        <ul>
          <li>类型：Number</li>
          <li>默认值：0</li>
          <li>作用：横轴方向初始化位置。</li>
        </ul>
        <h2>startY</h2>
        <ul>
          <li>类型：Number</li>
          <li>默认值：0</li>
          <li>作用：纵轴方向初始化位置。</li>
        </ul>
        <h2>startX</h2>
        <ul>
          <li>类型：Number</li>
          <li>默认值：0</li>
          <li>作用：横轴方向初始化位置。</li>
        </ul>
        <h2>startY</h2>
        <ul>
          <li>类型：Number</li>
          <li>默认值：0</li>
          <li>作用：纵轴方向初始化位置。</li>
        </ul>
        <h2>startX</h2>
        <ul>
          <li>类型：Number</li>
          <li>默认值：0</li>
          <li>作用：横轴方向初始化位置。</li>
        </ul>
        <h2>startY</h2>
        <ul>
          <li>类型：Number</li>
          <li>默认值：0</li>
          <li>作用：纵轴方向初始化位置。</li>
        </ul>
      </Scroll>
    </div>
  )
}