import Vue from "vue";
import Vuex from "vuex";
import en from "../locales/en";
import zh from "../locales/zh-CN";
import tpl from "../config/data";
import config from "../config";

Vue.use(Vuex);
// author age
function age() {
  let birthday = new Date("1994-12-12".replace(/-/g, "/"));
  let date = new Date();
  return {
    age:
      date.getFullYear() -
      birthday.getFullYear() -
      (date.getMonth() < birthday.getMonth() ||
      (date.getMonth() == birthday.getMonth() &&
        date.getDate() < birthday.getDate())
        ? 1
        : 0)
  };
}
// other flexible data
function factoryConfig(data) {
  return {
    author: {
      ...data.author,
      ...age()
    },
    shares: {
      title: `${data.name}@${data.brand} Come and see, buddy 👬`
    }
  };
}
// 初始化数据
let language = uni.getStorageSync(`${config.key}_language`) || "English",
  data = language === "English" ? en : zh;

const store = new Vuex.Store({
  state: {
    app: {
      ...tpl,
      ...data,
      language,
      ...factoryConfig(data)
    }
  },
  mutations: {
    changeLanguage(state, payload) {
      data = payload === "English" ? en : zh;
      state.app = {
        ...state.app,
        ...data,
        language: payload,
        ...factoryConfig(data)
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
