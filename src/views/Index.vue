<template>
  <div class="index">
    <div class="container">

      <!-- 菜单轮播图整体 -->
      <div class="carousel-box">

        <!-- 左侧菜单 -->
        <div class="nav-menu">
          <ul class="menu-wrap">

            <li class="menu-item">
              <a href="javascript:void(0);">手机 电话卡</a>
              <div class="children">

                <ul v-for="item in menuList" :key="item.index">
                  <li v-for="sub in item" :key="sub.index">
                    <a :href="sub ? `/product/${sub.id}` : '' ">
                      <img :src="sub ?  sub.img : '/imgs/item-box-1.png' " alt="">
                      {{ sub ? sub.name : '小米11' }}
                    </a>
                  </li>
                </ul>

              </div>
            </li>

            <li class="menu-item">
              <a href="javascript:void(0);">电视 盒子</a>
              <div class="children"></div>
            </li>

            <li class="menu-item">
              <a href="javascript:void(0);">笔记本 平板</a>
              <div class="children"></div>
            </li>

            <li class="menu-item">
              <a href="javascript:void(0);">家电 插线板</a>
              <div class="children"></div>
            </li>

            <li class="menu-item">
              <a href="javascript:void(0);">出行 穿戴</a>
              <div class="children"></div>
            </li>

            <li class="menu-item">
              <a href="javascript:void(0);">智能 路由器</a>
              <div class="children"></div>
            </li>

            <li class="menu-item">
              <a href="javascript:void(0);">电源 配件</a>
              <div class="children"></div>
            </li>

            <li class="menu-item">
              <a href="javascript:void(0);">生活 箱包</a>
              <div class="children"></div>
            </li>

          </ul>
        </div>

        <!-- 轮播图 -->
        <el-carousel :interval="5000" arrow="always" height="100%">
          <el-carousel-item v-for="item in slideList" :key="item.index">
            <a :href="`/product/${item.id}`"><img :src="item.img" alt=""></a>
          </el-carousel-item>
        </el-carousel>

      </div>

      <!-- 广告 -->
      <div class="ads-box">
        <a :href="`/product/${item.id}`" v-for="item in adsList" :key="item.index">
          <!-- <img :src="item.img" alt="">  初始与下方懒加载 -->
          <img v-lazy="item.img" alt="">
        </a>
      </div>

      <!-- 横幅 -->
      <div class="banner">
        <a :href="'/product/30'">
          <img v-lazy="'/imgs/banner-1.png'" alt="">
        </a>
      </div>

      <!-- 产品 -->
      <div class="box">
        <div class="product-box">
          <h2>手机</h2>
          <div class="wrapper">

            <!-- 左侧 -->
            <div class="banner-left">
              <a href="/product/35"><img v-lazy="'/imgs/mix-alpha.jpg'" alt=""></a>
            </div>

            <!-- 右侧 -->
            <div class="list-box">
              <div class="list" v-for="arr in phoneList" :key="arr.index">
                <div class="item" v-for="item in arr" :key="item.index" @click="addCart(item.id)">

                  <div class="item-img">
                    <img v-lazy="item.mainImage" alt="">
                  </div>

                  <div class="item-info">
                    <h3>{{ item.name }}</h3>
                    <p>{{  item.subtitle }}</p>
                    <p class="price">{{ item.price | currency }}
                    </p>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>

    <!-- 服务栏 -->
    <service-bar />

    <!-- 会话框 -->
    <model title="提示" sureText="查看购物车" btnType="1" modelType="middle" :showModel="showModel"
      @submit="goToCart" @cancel="showModel = false">
      <template #body>
        <p>添加商品成功</p>
      </template>
    </model>

  </div>
</template>

<script>
import ServiceBar from "@/components/ServiceBar";
import Model from "@/components/Model";

export default {
  components: {
    ServiceBar,
    Model
  },
  data() {
    return {
      slideList: [ // 轮播图列表
        {
          id: '42',
          img: '/imgs/slider/slide-1.jpg'
        },
        {
          id: '45',
          img: '/imgs/slider/slide-2.jpg'
        },
        {
          id: '46',
          img: '/imgs/slider/slide-3.jpg'
        }
      ],
      menuList: [ // 轮播图展开菜单列表
        [
          {
            id: 30,
            img: '/imgs/item-box-1.png',
            name: '小米CC9',
          }, {
            id: 31,
            img: '/imgs/item-box-2.png',
            name: '小米8青春版',
          }, {
            id: 32,
            img: '/imgs/item-box-3.jpg',
            name: 'Redmi K20 Pro',
          }, {
            id: 33,
            img: '/imgs/item-box-4.jpg',
            name: '移动4G+专区',
          },
        ], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0],
      ],
      adsList: [ // 广告列表
        {
          id: 33,
          img: 'imgs/ads/ads-1.png'
        },
        {
          id: 48,
          img: 'imgs/ads/ads-2.jpg'
        },
        {
          id: 45,
          img: 'imgs/ads/ads-3.png'
        },
        {
          id: 47,
          img: 'imgs/ads/ads-4.jpg'
        },
      ],
      phoneList: [ // 产品列表
      ],
      showModel: false, // 会话框显示隐藏
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    // 请求初始参数
    init() {
      this.$axios.get('/products', {
        params: {
          categoryId: 100012,
          pageSize: 14
        }
      })
        .then(res => {
          res.list = res.list.slice(6, 14)
          this.phoneList = [res.list.slice(0, 4), res.list.slice(4, 8)]
        })
        .catch(err => console.log(err))
    },
    // 添加购物车
    addCart(itemId) {
      this.$axios.post('/carts', { productId: itemId, selected: true })
        .then(res => {
          this.showModel = true
          this.$store.dispatch('saveCartCount', res.cartTotalQuantity)
        })
        .catch(err => {
          console.log(err)
          return this.$router.push('/login')
        })
    },
    // 跳转到购物车
    goToCart() {
      this.$router.push('/cart')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/config.scss";
@import "@/assets/scss/mixin.scss";

.index {
  // 菜单轮播图整体
  .carousel-box {
    position: relative;
    max-width: 1226px;
    margin: auto;

    // 左侧菜单
    .nav-menu {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      z-index: 3;

      box-sizing: border-box;
      width: 234px;
      height: 451px;
      background-color: rgba($color: #55585a, $alpha: 0.7);
      // opacity: 0.7;
      padding: 26px 0;

      .menu-wrap {
        .menu-item {
          height: 50px;
          line-height: 50px;

          a {
            position: relative;
            display: block;
            font-size: $fontI;
            color: $colorG;
            padding-left: 30px;

            &::after {
              position: absolute;
              top: 17.5px;
              right: 30px;
              bottom: 0;
              content: "";
              @include bgImg(10px, 15px, "/imgs/icon-arrow.png");
              // vertical-align: middle;
            }
          }

          &:hover {
            background-color: $colorA;

            .children {
              display: block;
            }
          }

          // 右侧展开菜单
          .children {
            display: none;
            position: absolute;
            top: 0;
            left: 234px;
            box-sizing: border-box;
            border: 1px solid $colorH;

            width: 992px;
            height: 451px;
            background-color: $colorG;

            ul {
              display: flex;
              justify-content: space-between;
              height: 75px;

              li {
                width: 241px;
                height: 75px;
                line-height: 75px;
                flex: 1;
                padding-left: 23px;

                a {
                  z-index: 1;
                  color: $colorB;
                  font-size: $fontJ;
                }
              }

              img {
                width: 42px;
                height: 35px;
                vertical-align: middle;
                margin-right: 15px;
              }
            }
          }
        }
      }
    }

    // 轮播图
    .el-carousel {
      height: 451px;

      .el-carousel__item {
        width: 100%;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  // 广告
  .ads-box {
    @include flex();
    margin: 14px auto 31px auto;
    max-width: $min-width;

    a {
      width: 296px;
      height: 167px;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  // 横幅
  .banner {
    margin: auto;
    margin-bottom: 50px;
    max-width: $min-width;

    img {
      width: 100%;
    }
  }

  // 产品
  .box {
    width: 100%;
    background-color: $colorJ;

    .product-box {
      max-width: $min-width;
      margin: auto;
      padding: 30px 0 50px;

      h2 {
        font-size: $fontF;
        font-weight: 1;
        height: 21px;
        line-height: 21px;
        color: $colorB;
        margin-bottom: 20px;
      }

      .wrapper {
        display: flex;

        .banner-left {
          margin-right: 16px;

          img {
            width: 224px;
            height: 619px;
            transition: all 0.5s;
            @include cardHover();
          }
        }

        .list-box {
          .list {
            display: flex;
            @include flex();
            width: 986px;
            margin-bottom: 14px;

            &:last-child {
              margin-bottom: 0;
            }

            .item {
              width: 236px;
              height: 302px;
              background-color: $colorG;
              text-align: center;
              transition: all 0.5s;
              cursor: pointer;
              @include cardHover();

              .item-img {
                img {
                  width: 80%;
                  height: 160px;
                  margin-top: 20px;
                  margin-bottom: 30px;
                }
              }

              .item-info {
                h3 {
                  font-size: $fontJ;
                  color: $colorB;
                  line-height: $fontJ;
                  font-weight: 1;
                }

                p {
                  color: $colorD;
                  line-height: 13px;
                  margin: 6px auto 13px;
                }

                .price {
                  color: #f20a0a;
                  font-size: fontJ;
                  cursor: pointer;

                  &::after {
                    content: "";
                    @include bgImg(22px, 22px, "/imgs/icon-cart-hover.png");
                    margin-left: 5px;
                    vertical-align: middle;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>