import Vue from "vue";
import App from "./App";
import store from "./store";
import api from "./utils/request";

Vue.config.productionTip = false;
// 全局挂载后使用
Vue.prototype.$api = api;
Vue.prototype.$store = store;

App.mpType = "app";

const app = new Vue({
  store,
  ...App
});
app.$mount();
