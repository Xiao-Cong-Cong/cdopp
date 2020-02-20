import Vue from 'vue'
import App from './App.vue'
import axios from './axios'
import store from './store'
import router from './router'
import 'bootstrap'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

Vue.config.productionTip = false

new Vue({
  axios,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
