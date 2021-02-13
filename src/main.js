import Vue from 'vue'
import VueLazyLoad from 'vue-lazyload' // 图片懒加载
import VueCookie from 'vue-cookie'
import App from './App.vue'
import router from './router'
import store from './store'
import './network/request' // axios config
import './plugins/element' // element-ui
import './plugins/priceFilter' // 价格过滤器

Vue.use(VueLazyLoad, {
  loading: '/imgs/loading-svg/loading-bars.svg' // 懒加载时对应的图片，可忽略第二参数
})

Vue.use(VueCookie)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import './assets/scss/reset.scss';
import './assets/scss/base.scss'
import './assets/element.css'; // 某些 element ui自定义样式需要定义在 main.js里
import './assets/scss/button.scss';