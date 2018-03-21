import axios from 'axios'
import vm from '../main'

import * as qs from 'qs'
// const qs = require('qs')

export const DefaultPostAxios = axios.create()

let token:string = localStorage.getItem('token') || ''

// 设置默认请求头
axios.defaults.headers.common.QZH_TOKEN = token
DefaultPostAxios.defaults.headers.common.QZH_TOKEN = token

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
  const { status, msg } = res.data
  const { NODE_ENV } = process.env
  // 如果token失效
  if (status === 400 && NODE_ENV === 'production') {
    location.href = '/login'
  } else if (status === 200) {
    Promise.resolve(res)
  } else {
    vm.$message.error(msg)
  }
  return res
}, error => {
  Promise.reject(error)
  vm.$message.error('网络错误，请稍后重试')
})

DefaultPostAxios.interceptors.response.use((res) => {
  const { status, msg } = res.data
  const { NODE_ENV } = process.env
  // 如果token失效
  if (status === 400 && NODE_ENV === 'production') {
    location.href = '/login'
  } else if (status === 200) {
    Promise.resolve(res)
  } else {
    vm.$message.error(msg)
  }
  return res
}, error => {
  Promise.reject(error)
  vm.$message.error('网络错误，请稍后重试')
})

export default axios
