import { stringify } from 'querystring'

const OVER_TIME = 30000; // 超时时间
const BASE_URL = '127.0.0.1:9999'

const RESOLVE_CODE = [ // 请求成功codes
  200,
  900002,
  510,
  900003,
]
// 重定向codes
const REDIRECT_CODE = { 
  700000: ['/login'],
  800000: ['/register'],
}
const MESSAGE_HELPER = {
  '2201001': '无法修改已经执行的任务',
}


/**
 * 接口统一封装，
 * @param {String} url 请求地址
 * @param {Object} options fetch第二个配置参数
 */
function send(url, options = {}) {
  url = BASE_URL + url
  // const { token } = getHeaders() || {};
  const {
    params, // get请求的参数
    ...restOptions
  } = options;
  const headers = {
    'Content-Type': 'application/json',
    'Accept-Charset': 'utf-8',
    'User-Agent': 'Mozilla/5.0 (Linux; X11)',
    // 'Authorization': token,
    ...(restOptions.headers || {})
  }
  restOptions.headers = headers;
  if (restOptions.method === 'GET' || restOptions.method === 'DELETE') {
    url = url + '?' + stringify(params)
  }
  return Promise.race([
    fetch(url, restOptions)
      .then(response => response.json())
      .then(responseJson => {
        // 请求成功处理
        if (RESOLVE_CODE.includes(responseJson.code)) {
          return Promise.resolve(responseJson)
        }
        // 处理重定向
        // const redirect = REDIRECT_CODE[responseJson.code];
        // 除了成功，则全部判断为错误
        return Promise.reject(responseJson)
      }),
    new Promise((_, reject) => setTimeout(() => reject({ msg: '网络链接不可用，请稍后重试', code: 4 }), OVER_TIME)), // 8s网络超时处理
  ])
    .catch((e = {}) => {
      const message = MESSAGE_HELPER[e.code] || e.msg || '';
      message && console.error(message)
      return Promise.reject(e)
    })
}

function request(url, options) {
  return send(url, options);
}

request.get = function (url, params, options = {}) {
  return send(url, {
    method: "GET",
    params,
    ...options,
  })
}

request.post = function (url, data = {}, options = {}) {
  return send(url, {
    method: "POST",
    body: JSON.stringify(data),
    ...options,
  })
}

request.put = function (url, data = {}, options = {}) {
  return send(url, {
    method: "PUT",
    body: JSON.stringify(data),
    ...options,
  })
}

request.delete = function (url, params = {}, options = {}) {
  return send(url, {
    method: "DELETE",
    params,
    ...options,
  })
}

export default request;
