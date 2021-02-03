<template>
  <!-- logo -->
  <div class="footer">
    <div class="footer-logo">
      <img src="/imgs/logo-footer.png" alt="">
      <p>小米商城</p>
    </div>

    <!-- 链接 -->
    <div class="footer-link">
      <a href="https://github.com/w15926" target="_blank">我的GitHub</a><span>|</span>
      <a href="https://github.com/w15926" target="_blank">我的GitHub</a><span>|</span>
      <a href="https://github.com/w15926" target="_blank">我的GitHub</a><span>|</span>
      <a href="https://github.com/w15926" target="_blank">我的GitHub</a><span>|</span>
      <a href="https://github.com/w15926" target="_blank">我的GitHub</a><span>|</span>
      <a href="https://github.com/w15926" target="_blank">我的GitHub</a>
    </div>

    <!-- 版权 -->
    <div class="copyright">
      Copyright ©2021 <span class="domain">mi.futurefe.com</span> All Rights Reserved.
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/config.scss";

.footer {
  height: 234px;
  border-top: 4px solid $colorA;
  color: $colorD;
  background-color: $colorB;
  font-size: $fontI;
  text-align: center;

  .footer-logo {
    margin-top: 46px;
    margin-bottom: 31px;

    img {
      width: 53px;
      height: 36px;
      margin-bottom: 13px;
    }
  }

  .footer-link {
    margin-bottom: 13px;

    a {
      color: $colorD;
      display: inline-block;
    }

    span {
      margin: 0 10px;
    }
  }

  .copyright {
    .domain {
      color: $colorA;
    }
  }
}
</style>