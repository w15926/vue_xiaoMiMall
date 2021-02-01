let baseURL

switch (process.env.NODE_ENV) { // 获取当前进程的环境变量
  case 'development':
    baseURL = 'http://dev-mall-pre.springboot.cn/api'
    break;
  case 'test':
    baseURL = 'http://test-mall-pre.springboot.cn/api'
    break;
  case 'production':
    baseURL = 'http://prod-mall-pre.springboot.cn/api'
    break;
}

export default {
  baseURL
}