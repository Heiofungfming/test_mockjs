import Vue from 'vue'
import './assets/plugins/element.js'

import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import './mock/index'



Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
