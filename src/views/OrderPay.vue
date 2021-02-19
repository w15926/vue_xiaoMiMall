<template>
  <div class="order-pay">
    <div class="wrapper">
      <div class="container">

        <!-- 订单 -->
        <div class="order-wrap">

          <!-- 订单基本信息 -->
          <div class="item-order">
            <div class="icon-succ"></div>

            <div class="order-info">
              <h2>订单提交成功！去付款咯～</h2>
              <p>请在<span>30分</span>内完成支付, 超时后将取消订单</p>
              <p>收货信息：{{ addressInfo }}</p>
            </div>

            <div class="order-total">
              <p>应付总额：<span>{{ payment }}</span>元</p>
              <p>订单详情<em class="icon-down" :class="{'up':showDetail}" @click="showDetail = !showDetail"></em></p>
            </div>

          </div>

          <!-- 订单详情 -->
          <div class="item-detail" v-if="showDetail">

            <div class="item">
              <div class="detail-title">订单号：</div>
              <div class="detail-info theme-color">{{ orderId }}</div>
            </div>

            <div class="item">
              <div class="detail-title">收货信息：</div>
              <div class="detail-info">{{ addressInfo }}</div>
            </div>

            <div class="item">
              <div class="detail-title">商品名称：</div>
              <div class="detail-info">
                <ul>
                  <li v-for="item in orderDetail" :key="item.index">
                    <img v-lazy="item.productImage" alt="">
                    {{ item.productName }}
                  </li>
                </ul>
              </div>
            </div>

            <div class="item">
              <div class="detail-title">发票信息：</div>
              <div class="detail-info">电子发票 个人</div>
            </div>

          </div>

        </div>

        <!-- 支付 -->
        <div class="item-pay">
          <h3>选择以下支付方式付款</h3>
          <div class="pay-way">
            <p>支付平台</p>
            <div class="pay pay-ali" @click="paySubmit(1)"></div>
            <div class="pay pay-wechat" @click="paySubmit(2)"></div>
          </div>
        </div>

      </div>
    </div>

    <!-- 微信支付弹窗 -->
    <scan-pay-code v-show="showPay" @close="closePayModel" :payImg="payImg" />

    <!-- 微信支付确认弹窗 -->
    <model title="支付确认" btnType="3" :showModel="showPayModel" sureText="查看订单" cancelText="未支付"
      @cancel="showPayModel = false" @submit="goOrderList">
      <template #body>
        <p>您确认是否完成支付</p>
      </template>
    </model>

  </div>
</template>

<script>
import QRCode from 'qrcode'
import ScanPayCode from "@/components/ScanPayCode";
import Model from "@/components/Model";

export default {
  components: {
    ScanPayCode,
    Model
  },
  data() {
    return {
      orderId: this.$route.query.orderNo,
      addressInfo: '', // 收货人地址
      orderDetail: [], // 订单详情列表
      showDetail: false, // 显示商品详情
      payType: 0, // 支付类型
      showPay: false, // 微信支付弹窗
      payImg: '', // 微信支付二维码地址
      showPayModel: false, // 微信支付确认弹窗
      payment: 0, // 订单总金额
      T: '', // 定时器
    }
  },
  mounted() {
    this.getOrderDetail()
  },
  methods: {
    getOrderDetail() {
      this.$axios.get(`/orders/${this.orderId}`)
        .then(res => {
          let item = res.shippingVo

          this.addressInfo =
            `
            ${item.receiverName}
            ${item.receiverMobile}
            ${item.receiverProvince}
            ${item.receiverCity}
            ${item.receiverDistrict}
            ${item.receiverAddress}
            `

          this.orderDetail = res.orderItemVoList
          this.payment = res.payment
        })
        .catch(err => console.log(err))
    },
    paySubmit(payType) {
      // 支付宝
      if (payType == 1) return window.open(`/order/alipay?orderId=${this.orderId}`)

      // 微信
      this.$axios.post('/pay', {
        orderId: this.orderId,
        orderName: 'Vue全家桶高仿小米商城',
        amount: 0.01, // 元
        payType: 2
      })
        .then(res => {
          this.content = res.content
          QRCode.toDataURL(res.content)
            .then(url => {
              this.showPay = true
              this.payImg = url
              this.loopOrderState
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))

    },
    // 关闭微信支付弹框
    closePayModel() {
      this.showPay = false
      this.showPayModel = true
      clearInterval(this.T)
    },
    // 轮询当前订单支付状态
    loopOrderState() {
      this.T = setInterval(() => {
        this.$axios.get(`/orders/${this.orderId}`)
          .then(res => {
            if (res.status == 20) return clearInterval(this.T) // 20已付款
            this.goOrderList()
          })
          .catch(err => console.log(err))
      }, 1000)
    },
    // 微信支付 model弹窗 
    goOrderList() {
      this.$router.push('/order/list')
    }
  }
}
</script>

<style lang="scss" scoped>
.order-pay {
  .wrapper {
    background-color: #f5f5f5;
    padding-top: 30px;
    padding-bottom: 61px;

    // 订单
    .order-wrap {
      padding: 62px 50px;
      background-color: #fff;
      font-size: 14px;
      margin-bottom: 30px;

      .item-order {
        display: flex;
        align-items: center;

        // icon
        .icon-succ {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: url("/imgs/icon-gou.png") #80c58a no-repeat center;
          background-size: 50px;
          margin-right: 40px;
        }

        .order-info {
          margin-right: 248px;

          h2 {
            font-size: 24px;
            color: #333;
            margin-bottom: 20px;
          }

          p {
            color: #666;

            span {
              color: #ff6700;
            }
          }
        }

        .order-total {
          & > p:first-child {
            margin-bottom: 30px;
          }

          span {
            font-size: 28px;
            color: #ff6700;
          }

          .icon-down {
            display: inline-block;
            width: 15px;
            height: 15px;
            background: url("/imgs/icon-down.png") no-repeat center;
            background-size: contain;

            border-radius: 50%;
            background-color: #ff6700;
            border: 3px solid #ff6700;

            margin-left: 9px;
            margin-bottom: -4px;

            transition: all 0.5s;
            cursor: pointer;

            &.up {
              transform: rotate(180deg);
            }
          }

          .icon-up {
            transform: rotate(180deg);
          }
        }
      }

      // 订单详情
      .item-detail {
        border-top: 1px solid #d7d7d7;
        padding-top: 47px;
        padding-left: 130px;
        font-size: 14px;
        margin-top: 45px;

        .item {
          margin-bottom: 19px;

          .detail-title {
            float: left;
            width: 100px;
          }

          .detail-info {
            display: inline-block;

            img {
              width: 30px;
              border-radius: 6px;
              vertical-align: middle;
            }
          }
        }
      }
    }

    // 支付
    .item-pay {
      padding: 26px 50px 72px;
      background-color: #fff;
      color: #333;

      h3 {
        font-size: 20px;
        font-weight: 200;
        color: #333;
        padding-bottom: 24px;
        border-bottom: 1px solid #d7d7d7;
        margin-bottom: 26px;
      }

      .pay-way {
        font-size: 18px;

        .pay {
          display: inline-block;
          width: 188px;
          height: 64px;
          border: 1px solid#d7d7d7;
          cursor: pointer;

          &:last-child {
            margin-left: 20px;
          }
        }

        .pay-ali {
          background: url("/imgs/pay/icon-ali.png") no-repeat center;
          background-size: 103px 38px;
          margin-top: 19px;
        }

        .pay-wechat {
          background: url("/imgs/pay/icon-wechat.png") no-repeat center;
          background-size: 103px 38px;
        }
      }
    }
  }
}
</style>