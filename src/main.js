import Vue from 'vue';
import App from './App.vue';
import router from './router/index.js';
import ElementUI from 'element-ui';
import "@/styles/base.scss";
import '@/styles/element-variables.scss';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store/index';
import redirectRouter from '@/utils/redirectRouter';

Vue.use(ElementUI);

Vue.prototype.$redirectRouter = redirectRouter;

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
