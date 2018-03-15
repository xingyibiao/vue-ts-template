import axios from 'axios'

import * as qs from 'qs'
// const qs = require('qs')

let token:string = localStorage.getItem('token') || ''

// 设置默认请求头
axios.defaults.headers.common.QZH_TOKEN = token

// 全局设置post请求
axios.interceptors.request.use((config) => {
  const { data, method } = config
  if (method.toLocaleLowerCase() === 'post') {
    config.data = qs.stringify(data)
  }
  return config
}, (error) => Promise.reject(error))

// 全局拦截token失效
axios.interceptors.response.use((res) => {
  const { status } = res.data
  // 如果token失效
  if (status === 400) {
    location.href = '/login'
  }
  return res
}, error => Promise.reject(error))


export default axios
