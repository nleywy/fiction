import Vue from 'vue';
import App from './App.vue';
import router from './router/index.js';
import ElementUI from 'element-ui';
import '@/styles/element-variables.scss'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/base.css';
import './assets/common.css';
import ajax from './tools/ajax';
import store from './store/index';
Vue.use(ElementUI);
Vue.use(ajax);


// import VueQuillEditor from 'vue-quill-editor';
// import 'quill/dist/quill.core.css';
// import 'quill/dist/quill.snow.css';
// import 'quill/dist/quill.bubble.css';


// Vue.use(VueQuillEditor);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
