import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// const Home = () => import('@/views/Home')
// const Index = () => import('@/views/Index')
// const Product = () => import('@/views/Product')
// const Detail = () => import('@/views/Detail')
// const Login = () => import('@/views/Login')
// const Cart = () => import('@/views/Cart')
// const Order = () => import('@/views/Order')
// const OrderList = () => import('@/views/OrderList')
// const OrderConfirm = () => import('@/views/OrderConfirm')
// const OrderPay = () => import('@/views/OrderPay')
// const Alipay = () => import('@/views/Alipay')

const routes = [
  { path: '', redirect: '/index' },
  {
    path: '/home', component: () => import('@/views/Home'), children:
      [
        { path: '/index', name: 'index', component: () => import('@/views/Index') },
        { path: '/product/:id', component: () => import('@/views/Product') },
        { path: '/detail/:id', component: () => import('@/views/Detail') },
      ]
  },
  { path: '/login', name: 'login', component: () => import('@/views/Login') },
  { path: '/cart', component: () => import('@/views/Cart') },
  {
    path: '/order', component: () => import('@/views/Order'), children:
      [
        { path: 'list', component: () => import('@/views/OrderList') },
        { path: 'confirm', component: () => import('@/views/OrderConfirm') },
        { path: 'pay', component: () => import('@/views/OrderPay') },
        { path: 'alipay', component: () => import('@/views/Alipay') },
      ]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
