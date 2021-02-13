<template>
  <div class="product">

    <!-- 顶部产品参数 -->
    <product-param :title="product.name">
      <template #buy>
        <button class="btn" @click="buy">立即购买</button>
      </template>
    </product-param>

    <!-- 内容区域 -->
    <div class="content">

      <!-- 背景图片 -->
      <div class="item-bg">
        <h2>{{ product.name }}</h2>
        <h3>{{ product.subtitle }}</h3>
        <p>
          <a href="" id="">全球首款双频 GP</a><span>|</span>
          <a href="" id="">骁龙845</a><span>|</span>
          <a href="" id="">AI 变焦双摄 GP</a><span>|</span>
          <a href="" id="">红外人脸识别</a>
        </p>
        <div class="price"><span>¥<em>{{ product.price }}</em></span></div>
      </div>

      <div class="item-bg-2"></div>

      <div class="item-bg-3"></div>

      <!-- 轮播图 -->
      <div class="item-swiper">
        <swiper :options="swiperOption">
          <swiper-slide><img src="/imgs/product/gallery-2.png" alt=""></swiper-slide>
          <swiper-slide><img src="/imgs/product/gallery-3.png" alt=""></swiper-slide>
          <swiper-slide><img src="/imgs/product/gallery-4.png" alt=""></swiper-slide>
          <swiper-slide><img src="/imgs/product/gallery-5.jpg" alt=""></swiper-slide>
          <swiper-slide><img src="/imgs/product/gallery-6.jpg" alt=""></swiper-slide>

          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <p class="desc">小米8 AI变焦双摄拍摄</p>
      </div>

      <!-- 视频 -->
      <div class="item-video">
        <h2>60帧超慢动作摄影<br />慢慢回味每一瞬间的精彩</h2>
        <p>后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！<br />更能AI 精准分析视频内容，15个场景智能匹配背景音效。</p>

        <div class="video-bg" @click="showSlide = true"></div>

        <div class="video-box">
          <div class="overlay" v-show="showSlide"></div>
          <div class="video" :class="{'slide':showSlide}">
            <div class="icon-colse" @click="closeVideo"></div>
            <video src="/imgs/product/video.mp4" controls autoplay muted></video>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import ProductParam from "@/components/ProductParam";
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';

export default {
  components: {
    ProductParam,
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      swiperOption: {
        autoplay: true,
        slidesPerView: 3,
        spaceBetween: 30,
        freeMode: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        }
      },
      showSlide: false, // 控制视频动画效果
      product: {}, // 产品数据
    }
  },
  mounted() {
    this.getProductInfo()
  },
  methods: {
    // 视频关闭按钮
    closeVideo() {
      this.showSlide = false
      document.querySelector('video').pause() // 视频暂停播放
    },
    // 得到产品数据
    getProductInfo() {
      let id = this.$route.params.id
      this.$axios.get(`/products/${id}`)
        .then(res => this.product = res)
        .catch(err => console.log(err))
    },
    // 点击购买按钮传递 id
    buy() {
      let id = this.$route.params.id
      this.$router.push(`/detail/${id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/mixin.scss";
@import "@/assets/scss/config.scss";

.product {
  .btn {
    margin-left: 10px;
  }

  .content {
    // 背景 1
    .item-bg {
      background: url("/imgs/product/product-bg-1.png") no-repeat center;
      height: 718px;
      text-align: center;

      h2 {
        font-size: 80px;
        padding-top: 55px;
      }

      h3 {
        font-size: 24px;
        letter-spacing: 10px;
      }

      p {
        margin-top: 21px;
        margin-bottom: 40px;

        a {
          font-size: 16px;
          color: #333;
        }

        span {
          margin: 0 15px;
        }
      }

      .price {
        font-size: 30px;
        color: #333;

        em {
          font-style: normal;
          font-size: 38px;
        }
      }
    }

    // 背景 2
    .item-bg-2 {
      background: url("/imgs/product/product-bg-2.png") no-repeat center;
      height: 480px;
      background-size: 1226px 397px;
    }

    // 背景 3
    .item-bg-3 {
      background: url("/imgs/product/product-bg-3.png") no-repeat center;
      height: 638px;
      background-size: cover;
    }

    // 轮播图
    .item-swiper {
      margin: 36px auto 32px;

      .desc {
        font-size: 18px;
        color: #333;
        text-align: center;
        margin-top: 20px;
      }

      img {
        width: 100%;
      }
    }

    // 视频内容
    .item-video {
      height: 1044px;
      background-color: #070708;
      margin-bottom: 76px;
      color: #fff;
      text-align: center;

      h2 {
        font-size: 60px;
        padding-top: 82px;
        margin-bottom: 47px;
      }

      p {
        font-size: 24px;
        margin-bottom: 58px;
      }

      .video-bg {
        background: url("/imgs/product/gallery-1.png") no-repeat center;
        background-size: cover;
        width: 1226px;
        height: 540px;
        margin: 0 auto 120px;
        cursor: pointer;
      }

      // 视频
      .video-box {
        .overlay {
          @include position(fixed);
          background-color: $colorB;
          opacity: 0.7;
          z-index: 998;
        }

        .video {
          position: fixed;
          top: -50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 999;
          opacity: 0;
          transition: all 0.5s;

          &.slide {
            top: 50%;
            opacity: 1;
          }

          .icon-colse {
            position: absolute;
            top: 20px;
            right: 20px;

            @include bgImg(20px, 20px, "/imgs/icon-close.png");
            cursor: pointer;
            transition: all 0.3s;

            background-color: #333;
            border: 7px solid #333;
            border-radius: 50%;

            z-index: 999;

            &:hover {
              transition: all 0.3s;
              background-color: #e93828;
              border: 7px solid #e93828;
              transform: scale(1.3);
            }
          }

          video {
            width: 1000px;
            height: 536px;
            object-fit: cover;
            outline: none;
          }
        }
      }
    }
  }
}
</style>