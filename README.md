# Try React everything

基于create-react-app官方脚手架搭建。

## 工程目录

```
├── assets 静态资源
├── components 公共组件
├── hooks 公共hook
├── layouts 复合组件
├── pages 业务组件
├── providers context存储
├── reducer 配合StoreCtxProvider使用的reducers
├── routers 项目路由
├── store redux及reducer集中配置（StoreProvider）
├── styles 全局样式
├── utils 工具类
│   └── theme.js 配置颜色主题
├── index.js 入口文件
```

## 明暗主题

> 许多人喜欢将网站设置成**暗模式**，也许他们更喜欢这种外观，或者他们想使眼睛免于疲劳

主题变量全部保存在 `@/utils/theme.js` 中，内置了 `DARK` 和 `LIGHT` 两种主题。
主题适配的逻辑在 `@/providers/ThemeProvider.js` 中，探测用户的主题模式来自动适配明暗模式，并提供 `changeTheme` 函数来随时切换主题。
先看看如何通过原生css抽离主题：

在 `:root` 标签声明主题色
```css
:root {
  --primary: #04CD9E;
  --accent: #F36834;
  --bg: #fff;
}
```

通过 `var(--constant)` 即可使用该主题色
```css
.container {
  background-color: var(--bg);
  color: var(--primary)
}
```

若在js中使用某个主题值，则通过 `ThemeProvider` 中 `useTheme` 来访问全局样式主题，如下
```jsx
import { useTheme } from '@/providers/ThemeProvider'
const { changeTheme, theme } = useTheme()

const Home = () => {
  return (
    <button 
      onClick={changeTheme} 
      style={{
        color: theme.bg, 
        background: theme.accent, 
      }}
    >更换主题</button>
  )
}
```

上面的 `changeTheme` 函数则实现了明暗主题的切换

## 移动端自适应布局

项目采用 `rem` 移动端自适应布局解决方案。
利用 `vw` 动态设置 `html` 的 `font-size` 属性，来达到自适应布局。

设置值为：`N / 设计稿宽度 * 100`，这时 `1rem` 就相当于 设计稿上的 `N px`。n 需自己根据使用习惯制定，项目习惯使用 `1:100`，也就是 `1rem = 100px`。

若一个盒子在宽为750的设计稿上为 `100px * 100px`，则需要如下代码：
```css
html {
  font-size: 13.333333333333vw;
}
div {
  width: 1rem;
  height: 1rem;
}
```

## useRedux

> 使用此方式更新state，会导致所有用到useStore的子组件渲染，无法避免无效更新。故不推荐使用。

详情查看 `@/providers/StoreCtxProvider` 


## redux

> Flux 架构就像眼镜：您自会知道什么时候需要它。

项目引入了 `thunk` 中间件，但还是推荐你使用 `dva` 框架的数据管理模式。项目模拟了 `dva` 的数据模块化以及简易实现 `loading` 状态管理。可在 `@store/reducer` 查看源码。以下简单介绍如何在项目使用状态管理：

建议在页面同级目录建立 `model.js` 来存储状态，使用 `async/await` 来处理异步调用
```javascript
// xxx/model.js
export default {
  namespace: 'home',
  state: {
    count: 1,
  },
  reducers: {
    setCount(state, action){
      return { ...state, count: action.payload }
    }
  },
  effects: {
    async asyncSetCount(dispatch, state, action) {
      // delay 为若干毫秒后resolve的Promise, 这里可以当成接口请求的延迟
      // 如：const data = await fetchAPI()
      await delay(2000) 
      return dispatch({ type: 'home/setCount', payload: state.count + 1 })
    },
  }
}
```
上面对象中每个字段各司其职。`namespace` 用于模块区分，`state` 存储数据，`reducers` 存储纯函数 `reducer`，而 `effects` 则处理副作用如接口调用等。

注意：声明完 `model.js` 需在 `@/store/models.js` 中手动引入，项目没有配置自动引入的能力😂

触发 `effects`、`reducers` 很简单，只需要通过 `connect` 在组件中拿到 `dispatch` ，只不过 `action` 的 `type` 属性需要严格遵守 `namespace/methodName` 的格式，如：
```jsx
// Home/index.js
import React from 'react'
import { connect } from 'react-redux'

const Home = (props) => {
  const { count, dispatch } = props

  const _add = () => {
    dispatch({
      type: 'home/asyncSetCount',
      payload: count + 1
    }).then((res) => {
      console.log(res)
    })
  }

  return (
    <div>
      <input value={count} />
      <button onClick={_add}>+</button>
    </div>
  )
}

export default connect(
  ({ home }) => ({ 
    count: home.count 
  })
)
```
通过上面案例可以看出 `dispatch` 返回了一个 `Promise`示例，可以在 `@store/reducer` 中 `asyncDispatch` 中间件中寻找答案

## 样式

样式引入scss，通过后缀名增加 `.module` 来区分 `CSS Module`，如下
```javascript
import styles from './styles.module.scss'
```

模块样式放到同级目录中，样式不能出现互相引用、传递现象。若是公共样式，则放置到 `styles` 文件夹中。如下
```
├── Home
|   ├── index.js
│   └── style.module.scss
└──
```

通过 `:global` 改写模块化样式下的全局样式，以下代码改写了 `swiper` 的分页**小点点**的背景颜色

```scss
// styles.module.scss
.container {
  background-color: var(--primary);
  height: 100vh;
  :global{
    .swiper-pagination{
      bottom: .8rem;
      .swiper-pagination-bullet{
        background-color: var(--primary);
      }
    }
  }
}
```

## 路由

路由需在 `@/routers/index` 统一配置，通过 `React.lazy` 实现路由的按需加载。

通过 `react-router-config` 的 `renderRoutes` 方法来统一渲染路由，该方法没有进行递归渲染，若存在二级路由，则需要再次在组件中使用该方法。如：
```javascript
// routers/index.js
export default [
  {
    path: '/recommend',
    component: Recommend,
    routes: [
      {
        path: '/recommend/:id',
        component: RecommendDetail,
      }
    ]
  },
]
```

```jsx
// Recommend.js
...
const Recommend = (props) => {
  return (
    <div>
      ...
      {renderRoutes(props.route.routes)}
      // 相当于：
      // <Route path="/recommend/:id" {...{...}} />
    </div>
  )
}
...
```
将 `renderRoutes(props.route.routes)` 自由放置在任何位置进行二级路由组件的声明

## TODO

- redux model自动注入
- 解决redux chrome插件无法监测effects的问题
- 递归渲染路由中嵌套组件
- 配置Iconfont、svg等图标解决方案
- 解决useCtxStore 更新问题