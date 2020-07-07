import { parse } from 'querystring'

import createCtx from './createCtx'
import request from './request'
import theme from './theme'

const getPageQuery = () => parse(window.location.href.split('?')[1])

export {
  createCtx,  
  request,
  theme,

  getPageQuery
}