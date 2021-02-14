import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home = () => import('@/views/Home')
const Index = () => import('@/views/Index')
const Product = () => import('@/views/Product')
const Detail = () => import('@/views/Detail')
const Login = () => import('@/views/Login')
const Cart = () => import('@/views/Cart')
const Order = () => import('@/views/Order')
const OrderList = () => import('@/views/OrderList')
const OrderConfirm = () => import('@/views/OrderConfirm')
const OrderPay = () => import('@/views/OrderPay')
const Alipay = () => import('@/views/Alipay')

const routes = [
  { path: '', redirect: '/index' },
  {
    path: '/home', component: Home, children:
      [
        { path: '/index', name: 'index', component: Index },
        { path: '/product/:id', component: Product },
        { path: '/detail/:id', component: Detail },
      ]
  },
  { path: '/login', name: 'login', component: Login },
  { path: '/cart', component: Cart },
  {
    path: '/order', component: Order, children:
      [
        { path: 'list', component: OrderList },
        { path: 'confirm', component: OrderConfirm },
        { path: 'pay', component: OrderPay },
        { path: 'alipay', component: Alipay },
      ]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
