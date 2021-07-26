import Vue from 'vue'
import App from './App.vue'
import store from './store'
import Notifications from 'vue-notification'
import spoilerDirective from './directives/spoiler'

Vue.config.productionTip = false

Vue.directive('spoiler', spoilerDirective)
Vue.use(Notifications)

import "@/assets/main.scss"

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
