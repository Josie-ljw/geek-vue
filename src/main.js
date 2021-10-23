// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import {post, get} from './utils/http'
import qs from 'qs'

//配全局属性配置，在任意组件内可以使用this.$qs获取qs对象 
Vue.prototype.$qs = qs
//定义全局变量
Vue.prototype.$post=post;
Vue.prototype.$get=get;
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})
