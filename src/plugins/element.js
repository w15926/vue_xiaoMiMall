import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css';

import {
  Carousel,
  CarouselItem,
  Notification,
  Message
} from 'element-ui';

Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message