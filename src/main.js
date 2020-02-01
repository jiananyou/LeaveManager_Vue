import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VCharts from 'v-charts'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.use(ElementUI)
Vue.use(VCharts)

Vue.prototype.getNowFormatDate = function () {
  var date = new Date()
  var year = date.getFullYear()
  var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  var hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  var minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  var second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  var currentdate = year + '/' + month + '/' + day + ' ' + hour + ':' + minute + ':' + second
  return currentdate
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
