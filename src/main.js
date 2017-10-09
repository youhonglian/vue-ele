// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axiosJs from 'axios'
Vue.config.productionTip = false
Vue.prototype.$axios = axiosJs
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
