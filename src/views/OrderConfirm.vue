<template>
  <div class="order-confirm">
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
      style="position: absolute; width: 0px; height: 0px; overflow: hidden;">
      <defs>
        <symbol id="icon-add" viewBox="0 0 31 32">
          <title>add</title>
          <path
            d="M30.745 15.152h-14.382v-14.596c0-0.308-0.243-0.557-0.543-0.557s-0.543 0.249-0.543 0.557v14.596h-14.665c-0.3 0-0.543 0.249-0.543 0.557s0.243 0.557 0.543 0.557h14.665v15.177c0 0.307 0.243 0.557 0.543 0.557s0.543-0.249 0.543-0.557v-15.177h14.382c0.3 0 0.543-0.249 0.543-0.557s-0.243-0.557-0.543-0.557z"
            class="path1"></path>
        </symbol>
        <symbol id="icon-edit" viewBox="0 0 32 32">
          <title>edit</title>
          <path
            d="M28.287 8.51l-4.805-4.806 0.831-0.831c0.472-0.472 1.086-0.777 1.564-0.777 0.248 0 0.452 0.082 0.622 0.253l3.143 3.144c0.539 0.54 0.133 1.529-0.524 2.186l-0.831 0.831zM26.805 9.992l-1.138 1.138-4.805-4.806 1.138-1.138 4.805 4.806zM24.186 12.612l-14.758 14.762-4.805-4.806 14.758-14.762 4.805 4.806zM7.379 28.288l-4.892 1.224 1.223-4.894 3.669 3.67zM31.123 4.011l-3.143-3.144c-0.567-0.567-1.294-0.867-2.103-0.867-1.036 0-2.174 0.52-3.045 1.391l-20.429 20.436c-0.135 0.134-0.23 0.302-0.276 0.487l-2.095 8.385c-0.089 0.355 0.017 0.736 0.276 0.995 0.198 0.198 0.461 0.307 0.741 0.307 0.085 0 0.171-0.010 0.254-0.031l8.381-2.096c0.185-0.047 0.354-0.142 0.487-0.276l20.43-20.436c1.409-1.41 2.042-3.632 0.524-5.15v0z"
            class="path1"></path>
        </symbol>
        <symbol id="icon-del" viewBox="0 0 32 32">
          <title>delete</title>
          <path
            d="M11.355 4.129v-2.065h9.29v2.065h-9.29zM6.194 29.935v-23.742h19.613v23.742h-19.613zM30.968 4.129h-8.258v-3.097c0-0.569-0.463-1.032-1.032-1.032h-11.355c-0.569 0-1.032 0.463-1.032 1.032v3.097h-8.258c-0.569 0-1.032 0.463-1.032 1.032s0.463 1.032 1.032 1.032h3.097v24.774c0 0.569 0.463 1.032 1.032 1.032h21.677c0.569 0 1.032-0.463 1.032-1.032v-24.774h3.097c0.569 0 1.032-0.463 1.032-1.032s-0.463-1.032-1.032-1.032v0z"
            class="path1"></path>
          <path
            d="M10.323 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"
            class="path2"></path>
          <path
            d="M16 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"
            class="path3"></path>
          <path
            d="M21.677 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"
            class="path4"></path>
        </symbol>
      </defs>
    </svg>

    <div class="wrapper">
      <div class="container">

        <div class="order-box">

          <!-- 地址 -->
          <div class="item-adress">
            <h2 class="addr-title">收货地址</h2>

            <div class="addr-list clearfix">

              <!-- 地址信息 -->
              <div class="addr-info" v-for="(item, index) in list" :key="index" :class="{'checked':index == checkIndex}"
                @click="checkIndex = index">
                <h2>{{ item.receiverName }}</h2>
                <div class="phone">{{ item.receiverMobile }}</div>
                <div class="street">{{ `${item.receiverProvince} ${item.receiverCity} ${item.receiverDistrict}` }}</div>

                <!-- 行为 -->
                <div class="action">
                  <!-- 删除 -->
                  <a href="javascript:void(0);" class="fl" @click="delAddress(item)">
                    <svg class="icon icon-del">
                      <use xlink:href="#icon-del"></use>
                    </svg>
                  </a>
                  <!-- 编辑 -->
                  <a href="javascript:void(0);" class="fr" @click="editAddressModel(item)">
                    <svg class="icon icon-edit">
                      <use xlink:href="#icon-edit"></use>
                    </svg>
                  </a>
                </div>

              </div>

              <!-- 添加地址 -->
              <div class="addr-add" @click="openAddressModel">
                <div class="icon-add"></div>
                <div>添加新地址</div>
              </div>

            </div>
          </div>

          <!-- 商品 -->
          <div class="item-goods">
            <h2>商品</h2>
            <ul>
              <li v-for="item in cartList" :key="item.index">

                <!-- 商品名字 -->
                <div class="goods-name">
                  <img v-lazy="item.productMainImage" alt="">
                  <span>{{ `${item.productName} ${item.productSubtitle}` }}</span>
                </div>

                <!-- 商品价格 -->
                <div class="goods-price">{{ item.productPrice | currency }} x{{ item.quantity }}</div>

                <!-- 商品总价 -->
                <div class="goods-total">{{item.productTotalPrice | currency }}</div>
              </li>
            </ul>
          </div>

          <!-- 商品运输 -->
          <div class="item-shipping">
            <h2>配送方式</h2>
            <span>包邮</span>
          </div>

          <!-- 商品发票 -->
          <div class="item-invoice">
            <h2>发票</h2>
            <a href="javascript:void(0);">电子发票</a>
            <a href="javascript:void(0);">个人</a>
          </div>

          <!-- 商品详情 -->
          <div class="detail">
            <div class="item">
              <span class="item-name">商品件数：</span>
              <span class="item-val">{{ count }}件</span>
            </div>
            <div class="item">
              <span class="item-name">商品总价：</span>
              <span class="item-val">{{ cartTotalPrice | currency }}</span>
            </div>
            <div class="item">
              <span class="item-name">优惠活动：</span>
              <span class="item-val">0元</span>
            </div>
            <div class="item">
              <span class="item-name">运费：</span>
              <span class="item-val">0元</span>
            </div>
            <div class="item-total">
              <span class="item-name">应付总额：</span>
              <span class="item-val">{{ cartTotalPrice | currency }}</span>
            </div>
          </div>

          <!-- 按钮 -->
          <div class="btn-group">
            <a href="/cart" class="btn btn-default btn-large">返回购物车</a>
            <a href="javascript:void(0);" class="btn btn-large" @click="orderSubmit">去结算</a>
          </div>

        </div>
      </div>
    </div>

    <!-- 添加信息弹框 -->
    <model title="新增确认" btnType="1" :showModel="showEditModel" @cancel="showEditModel=false" @submit="submitAddress">
      <template #body>
        <div class="edit-wrap">
          <div class="item">
            <input type="text" class="input" placeholder="姓名" v-model="checkedItem.receiverName">
            <input type="text" class="input" placeholder="手机号" v-model="checkedItem.receiverMobile">
          </div>
          <div class="item">
            <select name="province" v-model="checkedItem.receiverProvince">
              <option value="北京">北京</option>
              <option value="江苏">江苏</option>
              <option value="日本">日本</option>
            </select>
            <select name="city" v-model="checkedItem.receiverCity">
              <option value="北京">北京</option>
              <option value="南京">南京</option>
              <option value="东京">东京</option>
            </select>
            <select name="district" v-model="checkedItem.receiverDistrict">
              <option value="天安门">天安门</option>
              <option value="秦淮区">秦淮区</option>
              <option value="切腹县">切腹县</option>
            </select>
          </div>
          <div class="item">
            <textarea name="street" placeholder="详细地址" v-model="checkedItem.receiverAddress"></textarea>
          </div>
          <div class="item">
            <input type="text" class="input" placeholder="邮编" v-model="checkedItem.receiverZip">
          </div>
        </div>
      </template>
    </model>

    <!-- 删除弹框 -->
    <model title="删除确认" btnType="1" :showModel="showDelModel" @cancel="showDelModel=false" @submit="submitAddress">
      <template #body>
        <p>您确认要删除此地址吗</p>
      </template>
    </model>

  </div>
</template>

<script>
import Model from "@/components/Model";

export default {
  components: {
    Model
  },
  data() {
    return {
      list: [], // 收货地址列表
      cartList: [], // 购物车中需要结算的商品列表
      cartTotalPrice: 0, // 订单总金额
      count: 0, // 总件数
      checkedItem: {}, // 选中的商品对象
      userAction: '', // 用户行为 0:新增 1:编辑 2:删除
      showDelModel: false, // 是否显示删除弹框
      showEditModel: false, // 是否显示编辑弹框
      checkIndex: 0, // 选中的地址
    }
  },
  mounted() {
    this.getAddressList()
    this.getCartList()
  },
  methods: {
    // 得到地址列表
    getAddressList() {
      this.$axios.get('/shippings').then(res => this.list = res.list)
    },
    // 得到购物车列表
    getCartList() {
      this.$axios.get('/carts').then(res => {
        let list = res.cartProductVoList
        this.cartTotalPrice = res.cartTotalPrice
        this.cartList = list.filter(item => item.productSelected)
        this.cartList.map(item => this.count += item.quantity)
      })
    },
    // 提交地址（地址新增、编辑、删除）
    submitAddress() {
      let { checkedItem, userAction } = this
      let method, url, params = {}

      if (userAction == 0) {
        method = 'post', url = '/shippings'
      } else if (userAction == 1) {
        method = 'put', url = `/shippings/${checkedItem.id}`
      } else {
        method = 'delete', url = `/shippings/${checkedItem.id}`
      }

      // 新增和编辑表单 axios需要提交 params
      if (userAction == 0 || userAction == 1) {
        let {
          receiverName,
          receiverMobile,
          receiverProvince,
          receiverCity,
          receiverDistrict,
          receiverAddress,
          receiverZip
        } = checkedItem

        // 新增地址表单效验
        if (!receiverName) return this.$notify.warning('请填写姓名')
        if (!receiverMobile || !/\d{11}/.test(receiverMobile)) return this.$notify.warning('请检查11位手机号')
        if (!receiverProvince) return this.$notify.warning('请选择省份')
        if (!receiverCity) return this.$notify.warning('请选择城市')
        if (!receiverDistrict) return this.$notify.warning('请选择地区/县')
        if (!receiverAddress) return this.$notify.warning('请填写详细地址')
        if (!/\d{6}/.test(receiverZip)) return this.$notify.warning('请填写6位邮编')

        // params
        params = {
          receiverName,
          receiverMobile,
          receiverProvince,
          receiverCity,
          receiverDistrict,
          receiverAddress,
          receiverZip
        }
      }

      this.$axios[method](url, params)
        .then(() => {
          this.closeModel()
          this.getAddressList()
          this.$notify.success('操作成功')
        })
    },
    // 关闭弹窗执行事件
    closeModel() {
      this.checkedItem = {}
      this.userAction = ''
      this.showDelModel = false
      this.showEditModel = false
    },
    // 新增地址弹窗
    openAddressModel() {
      this.checkedItem = {}
      this.userAction = 0
      this.showEditModel = true
    },
    // 编辑地址弹窗
    editAddressModel(item) {
      this.checkedItem = item
      this.userAction = 1
      this.showEditModel = true
    },
    // 删除地址按钮
    delAddress(item) {
      this.checkedItem = item
      this.userAction = 2
      this.showDelModel = true
    },
    // 订单提交
    orderSubmit() {
      let item = this.list[this.checkIndex]
      if (!item) return this.$notify.error('请选择地址')

      this.$axios.post('/orders', { shippingId: item.id })
        // .then(res => this.$router.push({
        //   path: '/order/pay',
        //   query: { orderNo:res.orderNo }
        // }))
        .then(res => this.$router.push(`/order/pay?orderNo=${res.orderNo}`))
    }
  }
}
</script>

<style lang="scss" scoped>
.order-confirm {
  // 主体
  .wrapper {
    background-color: #f5f5f5;
    padding-top: 30px;
    padding-bottom: 84px;

    // 地址
    .order-box {
      background-color: #fff;
      padding-left: 40px;
      padding-bottom: 40px;

      .item-adress {
        padding-top: 38px;

        .addr-title {
          font-size: 20px;
          color: #333;
          font-weight: 200;
          margin-bottom: 21px;
        }

        .addr-list {
          .addr-info,
          .addr-add {
            box-sizing: border-box;
            float: left;
            width: 271px;
            height: 180px;
            border: 1px solid #e5e5e5;
            margin: 0 15px 15px 0;
            padding: 15px 24px;
            font-size: 14px;
            color: #757575;

            &.addr-info:last-child,
            &.addr-add:last-child {
              margin: 0;
            }

            &.addr-info:nth-child(4n),
            &.addr-add:nth-child(4n) {
              margin-right: 0;
            }
          }

          .addr-info {
            cursor: pointer;

            h2 {
              height: 27px;
              font-size: 18px;
              font-weight: 300;
              color: #333;
              margin-bottom: 10px;
            }

            .street {
              height: 50px;
            }

            .action {
              height: 50px;
              line-height: 50px;
            }

            .icon {
              width: 20px;
              height: 20px;
              fill: #666;
              vertical-align: middle;

              &:hover {
                fill: #ff6700;
              }
            }

            &.checked {
              border: 1px solid #ff6700;
            }
          }
        }

        .addr-add {
          text-align: center;
          color: #999;
          cursor: pointer;

          .icon-add {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: url("/imgs/icon-add.png") #e0e0e0 no-repeat center;
            background-size: 14px;
            margin: 0 auto;
            margin-top: 45px;
            margin-bottom: 10px;
          }
        }
      }

      // 商品
      .item-goods {
        margin-top: 34px;
        border-bottom: 1px solid #e5e5e5;
        padding-bottom: 5px;

        h2 {
          border-bottom: 1px solid #e5e5e5;
          padding-bottom: 5px;
        }

        li {
          display: flex;
          align-items: center;
          height: 40px;
          line-height: 40px;
          margin-top: 10px;
          font-size: 16px;
          color: #333;

          // 名字
          .goods-name {
            flex: 5;

            img {
              width: 30px;
              height: 30px;
              vertical-align: middle;
              border-radius: 10%;
              margin-right: 10px;
            }
          }

          // 价格
          .goods-price {
            flex: 2;
          }

          // 总价
          .goods-total {
            padding-right: 44px;
            color: #ff6600;
          }
        }
      }

      // 商品运输 && 商品发票
      .item-shipping,
      .item-invoice {
        margin-top: 31px;
        line-height: 20px;

        h2 {
          display: inline-block;
          margin-right: 71px;
          font-size: 20px;
          width: 80px;
        }

        span,
        a {
          font-size: 16px;
          color: #ff6700;
          margin-right: 23px;
        }
      }

      // 详情
      .detail {
        padding: 50px 44px 33px 0;
        border-bottom: 1px solid #f5f5f5;
        text-align: right;
        font-size: 16px;
        color: #666;

        .item-val {
          color: #ff6700;
        }

        .item {
          line-height: 15px;
          margin-bottom: 12px;
        }

        .item-total {
          .item-val {
            font-size: 28px;
          }
        }
      }

      .btn-group {
        margin-top: 37px;
        text-align: right;
      }
    }
  }

  // 弹框
  .edit-wrap {
    font-size: 14px;

    .item {
      margin-bottom: 15px;

      .input {
        display: inline-block;
        width: 283px;
        height: 40px;
        line-height: 40px;
        box-sizing: border-box;
        padding-left: 15px;
        border: 1px solid #e5e5e5;
        border-radius: 6px;

        & + .input {
          margin-left: 14px;
        }
      }

      // 街道
      select {
        width: 100px;
        height: 40px;
        line-height: 40px;
        text-indent: 1rem;
        border: 1px solid #e5e5e5;
        border-radius: 6px;
        margin-right: 15px;
      }

      // 详细地址
      textarea {
        width: 100%;
        height: 62px;
        padding: 1rem;
        resize: none;
        box-sizing: border-box;
        border: 1px solid #e5e5e5;
        border-radius: 6px;
      }
    }
  }
}
</style>