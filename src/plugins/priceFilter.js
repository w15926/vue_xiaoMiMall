import Vue from 'vue'

Vue.filter('currency', function (val) {
  if (!val) return '0.00'
  return '¥' + val.toFixed(2) + '元'
})