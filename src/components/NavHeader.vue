<template>
  <div class="header">
    <!-- 导航顶部 bar -->
    <div class="nav-topbar">
      <div class="container">

        <!-- 左侧内容 -->
        <div class="topbar-menu">
          <a href="javascript:void(0);">小米商城</a>
          <a href="javascript:void(0);">MUI</a>
          <a href="javascript:void(0);">云服务</a>
          <a href="javascript:void(0);">协议规则</a>
        </div>

        <!-- 右侧内容 -->
        <div class="topbar-user">
          <a href="javascript:void(0);" v-if="username">{{ username || '' }}</a>
          <a href="javascript:void(0);" v-if="!username" @click="login">登录</a>
          <a href="javascript:void(0);" v-if="username" @click="logout">退出</a>
          <a href="javascript:void(0);" v-if="username">我的订单</a>
          <a href="javascript:void(0);" class="my-cart" @click="goToCart">
            <span class="icon-cart"></span>
            购物车 ({{ cartCount }})
          </a>
        </div>

      </div>
    </div>

    <!-- 导航头部 -->
    <div class="nav-header">
      <div class="container">

        <!-- logo -->
        <div class="header-logo">
          <a href="/index"></a>
        </div>

        <!-- 菜单 -->
        <div class="header-menu">

          <!-- 小米手机 -->
          <div class="item-menu">
            <span>小米手机</span>
            <div class="children">
              <ul>

                <li class="product" v-for="(item, index) in phoneList" :key="index">
                  <a :href="`/product/${item.id}`" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="item.mainImage" :alt="item.subtitle">
                    </div>
                    <div class="pro-name">{{ item.name }}</div>
                    <div class="pro-price">{{ item.price | currency }}</div>
                  </a>
                </li>

              </ul>
            </div>
          </div>

          <!-- RedMi红米 -->
          <div class="item-menu">
            <span>RedMi红米</span>
          </div>

          <!-- 电视 -->
          <div class="item-menu">
            <span>电视</span>
            <div class="children">
              <ul>

                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'/imgs/nav-img/nav-3-1.jpg'" alt="">
                    </div>
                    <div class="pro-name">小米壁画电视 65寸</div>
                    <div class="pro-price">6999元</div>
                  </a>
                </li>

                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'/imgs/nav-img/nav-3-2.jpg'" alt="">
                    </div>
                    <div class="pro-name">小米全面屏电视E55A</div>
                    <div class="pro-price">1999元</div>
                  </a>
                </li>

                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'/imgs/nav-img/nav-3-3.png'" alt="">
                    </div>
                    <div class="pro-name">小米电视4A 32寸</div>
                    <div class="pro-price">699元</div>
                  </a>
                </li>

                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'/imgs/nav-img/nav-3-4.jpg'" alt="">
                    </div>
                    <div class="pro-name">小米电视4A 32寸</div>
                    <div class="pro-price">1799元</div>
                  </a>
                </li>

                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'/imgs/nav-img/nav-3-5.jpg'" alt="">
                    </div>
                    <div class="pro-name">小米电视4A 65寸</div>
                    <div class="pro-price">2699元</div>
                  </a>
                </li>

                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img v-lazy="'/imgs/nav-img/nav-3-6.png'" alt="">
                    </div>
                    <div class="pro-name">查看全部</div>
                    <div class="pro-price">小米电视</div>
                  </a>
                </li>

              </ul>
            </div>
          </div>
        </div>

        <!-- 搜索 -->
        <div class="header-search">
          <div class="wrapper">
            <input type="text" name="keyword">
            <a href="javascript:void(0);"></a>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  data() {
    return {
      phoneList: []
    }
  },
  mounted() {
    if (this.$route.params && this.$route.params.from == 'login') this.getCartCount()
    this.getProductList()
  },
  methods: {
    getProductList() {
      this.$axios.get('/products', {
        params: {
          categoryId: '100012',
          pageSize: 6
        }
      })
        .then(res => this.phoneList = res.list)
        .catch(err => console.log(err))
    },
    // 登录用户
    login() {
      this.$router.push('/login')
    },
    // 注销用户
    logout() {
      this.$axios.post('/user/logout')
        .then(() => {
          this.$notify.success('退出成功')
          this.$cookie.set('userId', '', { expires: '-1' })
          this.$store.dispatch('saveUserName', '')
          this.$store.dispatch('saveCartCount', '0')
        })
    },
    goToCart() {
      this.$router.push('/cart')
    },
    getCartCount() {
      this.$axios.get('/carts/products/sum').then((res = 0) => {
        this.$store.dispatch('saveCartCount', res);
      })
    }
  },
  computed: {
    // username() {
    //   return this.$store.state.username
    // },
    // cartCount() {
    //   return this.$store.state.cartCount
    // },
    ...mapState(['username', 'cartCount']) // 自动调用 vux里state
    // ...mapActions(['']) // 以此类推调用 vuex
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/base.scss";
@import "@/assets/scss/mixin.scss";
@import "@/assets/scss/config.scss";

.header {
  .nav-topbar {
    height: 39px;
    line-height: 39px;
    background-color: #333;
    color: #b0b0b0;

    .container {
      @include flex();

      a {
        display: inline-block;
        color: #b0b0b0;
      }

      .topbar-menu {
        a {
          margin-right: 17px;
        }
      }

      .topbar-user {
        a {
          margin-left: 17px;
        }

        .my-cart {
          width: 110px;
          background-color: $colorA;
          color: #fff;
          text-align: center;

          .icon-cart {
            @include bgImg(16px, 12px, "/imgs/icon-cart-checked.png");
          }
        }
      }
    }
  }

  .nav-header {
    .container {
      position: relative;
      height: 112px;
      @include flex();

      .header-menu {
        display: inline-block;
        width: 643px;
        padding-left: 209px;

        .item-menu {
          display: inline-block;
          color: #333;
          font-weight: bold;
          font-size: 16px;
          line-height: 112px;
          margin-right: 20px;

          span {
            cursor: pointer;
          }

          &:hover {
            color: $colorA;

            .children {
              height: 220px;
              opacity: 1;
              transition: all 0.3s;
            }
          }

          .children {
            position: absolute;
            top: 112px;
            left: 0;
            width: 1226px;
            height: 0;
            opacity: 0;
            overflow: hidden;
            border-top: 1px solid #e5e5e5;
            box-shadow: 0 7px 6px 0 rgba($color: #000000, $alpha: 0.11);
            z-index: 9999;
            transition: all 0.3s;
            background-color: #fff;

            .product {
              position: relative;
              float: left;
              width: 16.6%;
              height: 220px;
              font-size: 12px;
              line-height: 12px;
              text-align: center;

              a {
                display: inline-block;
              }

              img {
                width: auto;
                height: 111px;
                margin-top: 26px;
              }

              .pro-img {
                height: 137px;
              }

              .pro-name {
                font-weight: bold;
                margin-top: 19px;
                margin-bottom: 8px;
                color: $colorB;
              }

              .pro-price {
                color: $colorA;
              }

              &:before {
                content: " ";
                position: absolute;
                top: 28px;
                right: 0;
                border-left: 1px solid $colorF;
                height: 100px;
                width: 1px;
              }

              &:last-child::before {
                display: none;
              }
            }
          }
        }
      }

      .header-search {
        width: 319px;

        .wrapper {
          height: 50px;
          border: 1px solid #e0e0e0;
          display: flex;
          align-items: center;

          input {
            border: none;
            box-sizing: border-box;
            border-right: 1px solid #e0e0e0;
            width: 264px;
            height: 50px;
            padding-left: 14px;
          }

          a {
            @include bgImg(18px, 18px, "/imgs/icon-search.png");
            margin: auto;
          }
        }
      }
    }
  }
}
</style>