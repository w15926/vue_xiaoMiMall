import Vue from 'vue'
import axios from 'axios'

import NProgress from 'nprogress' // 导入 NProgress进度条和对应 css
import 'nprogress/nprogress.css'

axios.defaults.baseURL = '/api' // vue.config.js里使用里代理
axios.defaults.timeout = 5000

axios.interceptors.request.use(config => {
  NProgress.start()
  return config
})

axios.interceptors.response.use(config => {
  let res = config.data
  let path = location.pathname

  if (res.status == 0) {
    NProgress.done()
    return res.data // 请求与响应拦截中必须把 config return出去

  } else if (res.status == 10) {
    NProgress.done()
    if (path !== '/index') { // 这个接口状态码返回 10跳回登陆页面，为 0正常
      window.location.href = '/login'
    }
    return Promise.reject(res)

  } else {
    NProgress.done()
    console.log(res.msg)
    return Promise.reject(res)
  }
}, err => {
  let res = err.response
  console.log(res)
  return Promise.reject(res)
})

Vue.prototype.$axios = axios