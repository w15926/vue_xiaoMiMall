<template>
  <div class="login">

    <!-- logo -->
    <div class="container">
      <a href="/index"><img src="/imgs/login-logo.png" alt=""></a>
    </div>

    <!-- 表单 -->
    <div class="wrapper">
      <div class="container">
        <div class="login-form">

          <h3>
            <span class="checked">账号登录</span><span class="sep-line">|</span><span>扫码登录</span>
          </h3>

          <div class="input">
            <input type="text" placeholder="请输入账号" v-model="username">
          </div>
          <div class="input">
            <input type="text" placeholder="请输入密码" v-model="password">
          </div>

          <div class="btn-box">
            <a href="javascript:void(0);" class="btn" @click="login">登录</a>
          </div>

          <div class="tips">
            <div class="sms" @click="register">手机短信登录/注册</div>
            <div class="reg">立即注册<span>|</span>忘记密码</div>
          </div>

        </div>
      </div>
    </div>

    <!-- 底部 -->
    <div class="footer">
      <div class="footer-link">
        <a href="https://account.xiaomi.com/helpcenter/faq/zh_CN/00.introduction/faq-1">常见问题</a><span>｜</span>
        <a href="https://privacy.mi.com/miaccount/zh_CN/">隐私政策</a><span>｜</span>
        <a href="https://weibo.com/xiaomishangcheng?is_all=1#_loginLayer_1612526540904">新浪微博</a><span>｜</span>
        <a href="https://www.mi.com/about/contact">联系我们</a>
      </div>
      <p class="copyright">Copyright ©2020 mi.futurefe.com All Rights Reserved.</p>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login() {

    },
    register() {

    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/base";

.login {
  & > .container {
    max-width: 1226px;
    height: 100px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 98px;

    img {
      width: auto;
      height: 100%;
    }
  }

  .wrapper {
    background: url("/imgs/login-bg.jpg") no-repeat center;

    .container {
      position: relative;
      height: 575px;

      .login-form {
        box-sizing: border-box;
        padding-left: 31px;
        padding-right: 31px;

        width: 410px;
        height: 510px;
        background-color: #fff;

        position: absolute;
        bottom: 29px;
        right: 0;

        h3 {
          line-height: 24px;
          font-size: 24px;
          font-weight: 1;
          text-align: center;
          margin: 40px auto 49px;

          .checked {
            color: #ff6600;
          }

          .sep-line {
            margin: 0 32px;
          }
        }

        .input {
          display: inline-block;
          width: 348px;
          height: 50px;
          border: 1px solid #e5e5e5;
          margin-bottom: 20px;

          input {
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            border: none;
            padding: 18px;
          }
        }

        .btn {
          width: 100%;
          line-height: 50px;
          margin-top: 10px;
          font-size: 16px;
        }

        .tips {
          margin-top: 14px;
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          cursor: pointer;

          .sms {
            color: #999;
          }

          .reg {
            color: #999;

            span {
              margin: 0 7px;
            }
          }
        }
      }
    }
  }

  .footer {
    height: 100px;
    padding-top: 20px;
    color: #999;
    font-size: 16px;
    text-align: center;

    .footer-link {
      a {
        color: #999;
      }

      span {
        margin: 0 10px;
      }
    }

    .copyright{
      margin-top: 10px;
    }
  }
}
</style>