<template>
  <div>
    <order-header :title="title">
      <template #tip>
        {{ tip }}
      </template>
    </order-header>

    <router-view />
    <service-bar />
    <nav-footer />
  </div>
</template>

<script>
import OrderHeader from "@/components/OrderHeader";
import ServiceBar from "@/components/ServiceBar";
import NavFooter from "@/components/NavFooter";

export default {
  components: {
    OrderHeader,
    ServiceBar,
    NavFooter
  },
  data() {
    return {
      title: '订单支付',
      tip: '谨防钓鱼诈骗'
    }
  },
  mounted() {
    this.getHeaderInfo()
  },
  updated() {
    this.getHeaderInfo()
  },
  methods: {
    getHeaderInfo() {
      let path = this.$route.path

      switch (path) {
        case '/order/confirm':
          this.title = '订单确认'
          this.tip = '请认真填写收获地址'
          break;
        case '/order/list':
          this.title = '订单列表'
          this.tip = '请谨慎防钓鱼链接或诈骗电话'
          break;
        case '/order/pay':
          this.title = '订单支付'
          this.tip = ''
          break;
      }
    }
  }
}
</script>

<style>
</style>