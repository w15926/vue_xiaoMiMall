<template>
  <div class="order-header">
    <div class="container clearfix">

      <div class="header-logo">
        <a href="/index"></a>
      </div>

      <div class="title">
        <h2>
          {{ title }}
          <span>
            <slot name="tip"></slot>
          </span>
        </h2>
      </div>

      <div class="username">
        <a href="javascript:void(0);">{{ username }}</a>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    title: String
  },
  computed: {
    ...mapState(['username'])
  }
}
</script>

<style lang="scss" scoped>
.order-header {
  box-sizing: border-box;
  padding: 20px 0;

  .header-logo {
    float: left;
  }

  .title,
  .username {
    display: inline-block;
    height: 55px;
    line-height: 65px;
  }

  .title {
    font-size: 24px;
    float: left;
    color: #333;
    margin-left: 54px;

    h2 {
      font-weight: 100;
    }

    span {
      font-size: 14px;
      margin-left: 17px;
      color: #999;
    }
  }

  .username {
    float: right;

    a {
      color: #666;
      font-size: 16px;
    }
  }
}
</style>