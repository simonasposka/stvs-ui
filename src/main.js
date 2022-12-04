import Vue from 'vue';
import store from './store'
import router from './router'
import App from './App.vue'
import vmodal from 'vue-js-modal'

Vue.config.productionTip = false
Vue.use(vmodal, { dialog: true });
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import "./sass/main.scss";

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
