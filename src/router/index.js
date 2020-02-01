import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
/* 解决vue-router的一个bug */
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  mode: 'history', // 常规地址格式,去掉#
  routes: [{
    path: '/',
    name: 'Login',
    component: resolve => require(['@/components/Login.vue'], resolve)
  }, {
    path: '/index',
    name: 'Index',
    component: resolve => require(['@/components/Index.vue'], resolve),
    redirect: '/home',
    children: [{
      path: '/home',
      name: 'Home',
      component: resolve => require(['@/components/Home.vue'], resolve)
    }, {
      path: '/vacate',
      name: 'Vacate',
      component: resolve => require(['@/components/Vacate.vue'], resolve)
    }, {
      path: '/analysis',
      name: 'Analysis',
      component: resolve => require(['@/components/Analysis.vue'], resolve)
    }, {
      path: '/fileupload',
      name: 'FileUpload',
      component: resolve => require(['@/components/FileUpload.vue'], resolve)
    }, {
      path: '/settings',
      name: 'Settings',
      component: resolve => require(['@/components/Settings.vue'], resolve)
    }]
  }]
})
