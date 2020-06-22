import { createContext, useContext } from 'react'

function createCtx(initValue) {
  const ctx = createContext(initValue)
  const useCtx = () => {
    const c = useContext(ctx)
    if (!c) {
      throw new Error('使用useCtx需放入Provider中')
    }
    return c
  }
  return [
    useCtx,
    ctx.Provider,
  ]
}

export default createCtx