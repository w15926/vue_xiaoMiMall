<template>
  <div class="cart">

    <!-- 头部 -->
    <order-header :title="'我的购物车'">
      <template #tip>
        温馨提示：产品是否购买成，以最终下单为准哦，请尽快结算
      </template>
    </order-header>

    <!-- 主体 -->
    <div class="wrapper">
      <div class="container">
        <div class="cart-box">

          <!-- 购物车头部 -->
          <ul class="cart-item-head">
            <li class="col-1">
              <span class="checkbox" :class="{'checked':allChecked}" @click="togglrAll"></span>
              全选
            </li>
            <li class="col-3">商品名称</li>
            <li class="col-1">单价</li>
            <li class="col-2">数量</li>
            <li class="col-1">小计</li>
            <li class="col-1">操作</li>
          </ul>

          <!-- 购物车列表 -->
          <ul class="cart-item-list">
            <li class="cart-item" v-for="item in list" :key="item.index">

              <!-- 购物车复选框 -->
              <div class="item-check">
                <span class="checkbox" :class="{'checked':item.productSelected}" @click="updataCart(item)"></span>
              </div>

              <!-- 商品名称和图片 -->
              <div class="item-name">
                <img v-lazy="item.productMainImage" alt="">
                <span>{{ `${item.productName}，${item.productSubtitle}` }}</span>
              </div>

              <!-- 商品价格 -->
              <div class="item-price">{{ item.productPrice }}</div>

              <!-- 商品数量 -->
              <div class="item-num">
                <div class="num-box">
                  <a href="javascript:void(0);" @click="updataCart(item,'-')">-</a>
                  <span>{{ item.quantity }}</span>
                  <a href="javascripy:void(0);" @click="updataCart(item,'+')">+</a>
                </div>
              </div>

              <!-- 商品总计 -->
              <div class="item-total">{{ item.productTotalPrice }}</div>

              <!-- 商品删除 -->
              <div class="item-del" @click="delProduct(item.productId)"></div>

            </li>
          </ul>

        </div>

        <!-- 底部订单内容 -->
        <div class="order-wrap clearfix">

          <!-- 购物车提示 -->
          <div class="cart-tip fl">
            <a href="/index">继续购物</a>
            共<span>{{ list.length }}</span>件商品，已选择<span>{{ checkNum }}</span>件
          </div>

          <!-- 购物车结算 -->
          <div class="total fr">
            合计<span>{{ cartTotalPrice }}</span>元
            <a href="javascript:void(0);" class="btn" @click="order">去结算</a>
          </div>

        </div>
      </div>
    </div>

    <service-bar />
    <nav-footer />

    <!-- element-ui -->
    <!-- <el-button plain @click="warningMsg"></el-button> -->
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
      list: [], // 商品列表
      allChecked: false, // 是否全选
      cartTotalPrice: 0, // 商品总金额
      checkNum: 0, // 选中商品数量
    }
  },
  mounted() {
    this.getCartList()
  },
  methods: {
    // 获取购物车列表
    getCartList() {
      this.$axios.get('/carts').then(res => this.renderData(res)).catch(err => console.log(err))
    },
    // 全选按钮切换
    togglrAll() {
      let url = this.allChecked ? '/carts/unSelectAll' : '/carts/selectAll'
      this.$axios.put(url).then(res => this.renderData(res)).catch(err => console.log(err))
    },
    // 渲染 res
    renderData(res) {
      this.list = res.cartProductVoList || []
      this.allChecked = res.selectedAll
      this.cartTotalPrice = res.cartTotalPrice
      this.checkNum = this.list.filter(item => item.productSelected).length
    },
    // 产品数量加减 && 产品单选
    updataCart(item, type) {
      let quantity = item.quantity
      let selected = item.productSelected

      if (type == '-') {
        if (quantity == 1) {
          return this.$notify.warning('已经到底啦') // 简写（只有内容）
          return this.$notify({
            title: '嘿～',
            message: '已经到底啦',
            type: 'warning'
          })
        }
        --quantity
      } else if (type == '+') {
        if (quantity >= item.productStock) {
          return this.$notify.warning('已经最高啦')
        }
        ++quantity
      } else {
        selected = !item.productSelected // 单选框取反
      }

      this.$axios.put(`/carts/${item.productId}`, { quantity, selected })
        .then(res => this.renderData(res)).catch(err => console.log(err))
    },
    // 删除按钮
    delProduct(Id) {
      this.$axios.delete(`/carts/${Id}`)
        .then(res => {
          this.renderData(res)
          return this.$notify.success('删除成功')
        })
        .catch(err => console.log(err))
    },
    // 提交订单
    order() {
      let isCheck = this.list.every(item => !item.productSelected)

      if (isCheck) {
        return this.$notify.warning('最少选一个哦')
      } else {
        this.$router.push('/order/confirm')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.cart {
  .wrapper {
    background-color: #f5f5f5;
    padding-top: 30px;
    padding-bottom: 114px;

    .cart-box {
      background-color: #fff;
      font-size: 14px;
      color: #999;
      text-align: center;

      .checkbox {
        display: inline-block;
        width: 22px;
        height: 22px;
        border: 2px solid #ff6600 !important;
        border-radius: 50%;
        vertical-align: middle;
        margin-right: 17px;
        cursor: pointer;

        &.checked {
          background: url("/imgs/icon-gou.png") #ff6600 no-repeat center;
          font-size: 16px 12px;
          border: none;
        }
      }

      .cart-item-head {
        display: flex;
        height: 79px;
        line-height: 79px;

        .col-1 {
          flex: 1;
        }

        .col-2 {
          flex: 2;
        }

        .col-3 {
          flex: 3;
        }
      }

      .cart-item-list {
        .cart-item {
          display: flex;
          align-items: center;
          height: 125px;
          border-top: 1px solid #e5e5e5;
          font-size: 16px;

          .item-check {
            flex: 1;
          }

          .item-name {
            flex: 3;
            font-size: 18px;
            color: #333;
            display: flex;
            align-items: center;

            img {
              width: 80px;
              height: 80px;
              vertical-align: middle;
              border-radius: 10%;
            }

            span {
              margin-left: 30px;
            }
          }

          .item-price {
            flex: 1;
            color: #333;
          }

          .item-num {
            flex: 2;

            .num-box {
              display: inline-block;
              width: 150px;
              height: 40px;
              line-height: 40px;
              border: 1px solid #e5e5e5;
              font-size: 14px;

              a {
                display: inline-block;
                width: 50px;
                color: #333;
              }

              span {
                display: inline-block;
                width: 50px;
                color: #333;
              }
            }
          }

          .item-total {
            flex: 1;
            color: #ff6600;
          }

          .item-del {
            flex: 1;
            width: 14px;
            height: 12px;
            background: url("/imgs/icon-close.png") no-repeat center;
            background-size: contain;
            cursor: pointer;
            transition: all 0.3s;

            &:hover {
              transition: all 0.3s;
              transform: scale(1.4);
            }
          }
        }
      }
    }

    .order-wrap {
      font-size: 14px;
      color: #666;
      margin-top: 20px;
      height: 50px;
      line-height: 50px;

      .cart-tip {
        margin-left: 29px;

        a {
          color: #ff6600;
          margin-right: 37px;
        }

        span {
          color: #ff6600;
          margin: 0 5px;
        }
      }

      .total {
        font-size: 14px;
        color: #ff6600;

        span {
          font-size: 24px;
        }

        a {
          width: 202px;
          height: 50px;
          line-height: 50px;
          font-size: 18px;
          margin-left: 37px;
        }
      }
    }
  }
}
</style>