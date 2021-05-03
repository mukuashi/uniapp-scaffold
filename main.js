import Vue from 'vue';
import App from './App';
import store from './store';
import mixins from './mixins';
import api from './utils/request';
import storage from './utils/storage';

Vue.config.productionTip = false;

// 全局挂载后使用
Vue.prototype.$api = api;
Vue.prototype.$store = store;
Vue.prototype.$storage = storage;

Vue.mixin(mixins)

App.mpType = "app";

const app = new Vue({
  store,
  ...App,
});
app.$mount();
