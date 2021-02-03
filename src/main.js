import Vue from 'vue'
import App from './App.vue'
import './plugins/element' // element-ui
import router from './router'
import store from './store'
import './network/request' // axios config

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import './assets/element.css'; // 某些 element ui自定义样式需要定义在 main.js里
