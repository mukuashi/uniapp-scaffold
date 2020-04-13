import Vue from "vue";
import Vuex from "vuex";
import en from "../locales/en";
import zh from "../locales/zh-CN";
import tpl from "../config/data";
import config from "../config";

Vue.use(Vuex);
// 初始化数据
let language = uni.getStorageSync(`${config.key}_language`) || "Chinese",
  data = language === "English" ? en : zh;

const store = new Vuex.Store({
  state: {
    app: {
      ...tpl,
      ...data,
      language
    }
  },
  mutations: {
    // 切换语言（可以在视图层通过mapMutations或this.$store.commit("changeLanguage", curLanguage)调用）
    changeLanguage(state, payload) {
      data = payload === "English" ? en : zh;
      state.app = {
        ...state.app,
        ...data,
        language: payload
      };
    },
    // 更新某个key-value
    commonUpdate(state, payload) {
      state[payload.type] = {
        ...state[payload.type],
        ...payload.value
      };
    }
  },
  actions: {}
});

export default store;
