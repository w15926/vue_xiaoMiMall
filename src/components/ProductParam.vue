<template>
  <div class="nav-bar" :class="{ 'is_fixed': isFixed }">
    <div class="container">

      <div class="pro-title">{{ title }}</div>

      <div class="pro-param">
        <a href="javascripy:void(0);">概述</a><span>|</span>
        <a href="javascripy:void(0);">参数</a><span>|</span>
        <a href="javascripy:void(0);">用户评价</a>
        <slot name="buy"></slot>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String
  },
  data() {
    return {
      isFixed: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.initHeight)
  },
  methods: {
    initHeight() {
      // 适配 IE，总有一个能取到值
      let scrollTop = window.pageYOffset || window.document.documentElement.scrollTop || document.body.scrollTop
      this.isFixed = scrollTop > 152 ? true : false
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.initHeight)
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/config.scss";
@import "@/assets/scss/mixin.scss";

.nav-bar {
  height: 70px;
  line-height: 70px;
  border: 1px solid $colorH;

  &.is_fixed {
    position: sticky;
    top: 0;
    left: 0;
    right: 0;

    background-color: $colorG;
    border: none;
    box-shadow: 0 1px 4px rgba($color: #000000, $alpha: 0.3);
    z-index: 998;
  }

  .container {
    @include flex();

    .pro-title {
      font-size: $fontH;
      color: $colorB;
      font-weight: bold;
    }

    .pro-param {
      font-size: $fontJ;

      span {
        margin: 0 10px;
      }

      a {
        color: $colorC;
      }
    }
  }
}
</style>