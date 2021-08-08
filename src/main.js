import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Bus from '../EventBus'

//use
Vue.use(Bus)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
