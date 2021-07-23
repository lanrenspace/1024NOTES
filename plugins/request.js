import axios from 'axios'

/**
 * 创建axios
 */
const service = axios.create({
  baseURL: process.env.BASE_URL,
  withCredentials: true,
  timeout: 5000
})

/**
 * 请求拦截器
 */
service.interceptors.request.use(
  config => {
    config.headers['RequestToken'] = '10001'
    return config
  },
  error => {
    /* eslint-disable */
    console.log(error)
    return Promise.reject(error)
  }
)

/**
 * 响应拦截器
 */
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.status !== 200) {
      /* eslint-disable */
      console.error(res.msg || '请求异常,请稍后重试!')
      return Promise.reject(res.msg || 'error')
    } else {
      return res
    }
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 404:
          error.message = `请求服务: ${error.response.config.url} 不存在,请检查后重试!`
          break
        case 400:
          error.message = '请求服务错误,请稍后重试!'
          break
        case 401:
          error.message = '请求服务权限不足!'
          break
        default:
          error.message = '出现未知异常,请稍后重试!'
      }
    }
    console.error(error.message || '出现未知异常,请稍后重试!')
    return Promise.reject(error)
  }
)

export default service



