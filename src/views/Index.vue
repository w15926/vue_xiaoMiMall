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
              <div class="children"></div>
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
            <a :href="`/product${item.id}`"><img :src="item.img" alt=""></a>
          </el-carousel-item>
        </el-carousel>

      </div>

      <!-- 广告 -->
      <div class="adb-box"></div>

      <!-- 横幅 -->
      <div class="banner"></div>

      <!-- 产品 -->
      <div class="product-box"></div>

    </div>
    <service-bar></service-bar>
  </div>
</template>

<script>
import ServiceBar from "@/components/ServiceBar";

export default {
  components: {
    ServiceBar
  },
  data() {
    return {
      slideList: [
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
        },
        {
          id: '',
          img: '/imgs/slider/slide-4.jpg'
        },
        {
          id: '',
          img: '/imgs/slider/slide-5.jpg'
        },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.index {
  .carousel-box {
    position: relative;
    max-width: 1226px;
    margin: auto;

    // 左侧菜单
    .nav-menu {
      width: 250px;
      height: 451px;
      background-color: #000;
      opacity: .7;

      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      z-index: 3;
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
}
</style>