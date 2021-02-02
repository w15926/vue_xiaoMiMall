import Vue from 'vue'
import axios from 'axios'
// import env from "@/env";

import NProgress from 'nprogress' // 导入 NProgress进度条和对应 css
import 'nprogress/nprogress.css'

axios.defaults.baseURL = '/api' // vue.config.js里使用里代理
axios.defaults.timeout = 5000

// axios.defaults.baseURL = env.baseURL // 根据环境变量获取不同请求地址

axios.interceptors.request.use(config => {
  NProgress.start()
  // 将token保存在里面，访问接口其他数据时候需要验证
  // config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})

axios.interceptors.response.use(config => {
  let res = config.data
  if (res.status == 0) {
    NProgress.done()
    return res.data // 请求与响应拦截中必须把 config return出去
  } else if (res.status == 10) {
    window.location.href = '/login' // 这个接口状态码返回 10跳回登陆页面，为 0正常
  } else {
    alert(res.msg)
  }
})

Vue.prototype.$axios = axios