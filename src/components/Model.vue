<template>
  <transition name="slide">
    <div class="model" v-show="showModel">
      <!-- 遮罩层 -->
      <div class="mask"></div>

      <!-- 会话框 -->
      <div class="model-dialog">

        <!-- 头部 -->
        <div class="model-header">
          <span>{{ title }}</span>
          <a href="javascript:void(0);" class="icon-close" v-on:click="$emit('cancel')"></a>
        </div>

        <!-- 主体 -->
        <div class="model-body">
          <slot name="body"></slot>
        </div>

        <!-- 底部 -->
        <div class="model-footer">

          <a href="javascript:void(0);" class="btn" v-if="btnType == 1" @click="$emit('submit')">
            {{ sureText }}
          </a>
          <a href="javascript:void(0);" class="btn" v-if="btnType == 2" @click="$emit('cancel')">
            {{ cancelText }}
          </a>

          <div class="btn-group" v-if="btnType == 3">
            <a href="javascript:void(0);" class="btn" v-on:click="$emit('submit')">{{ sureText }}</a>
            <a href="javascript:void(0);" class="btn btn-default" v-on:click="$emit('cancel')">{{ cancelText }}</a>
          </div>

        </div>

      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    // 弹框类型：小small、中middle、大large、表单form
    modelType: {
      type: String,
      default: 'form'
    },
    // 弹框标题
    title: String,
    // 按钮类型：1确定按钮、2取消按钮、3确定取消
    btnType: String,
    sureText: {
      type: String,
      default: '确定'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    showModel: Boolean,
    default: false
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/config.scss";
@import "@/assets/scss/mixin.scss";
@import "@/assets/scss/model.scss";
</style>