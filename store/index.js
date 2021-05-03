import Vue from 'vue';
import Vuex from 'vuex';

import en from '@/config/locales/en';
import zh from '@/config/locales/zh-CN';
import config from '@/config';

import auth from './modules/auth'

Vue.use(Vuex);
// author age
function age() {
  let birthday = new Date("1994-08-01".replace(/-/g, "/"));
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

export default new Vuex.Store({
  state: {
    app: {
      ...config,
      ...data,
      language,
      ...factoryConfig(data),
    },
  },
  mutations: {
    changeLanguage(state, payload) {
      data = payload === 'English' ? en : zh;
      state.app = {
        ...state.app,
        ...data,
        language: payload,
        ...factoryConfig(data),
      };
    },
    // 更新某个key-value，module对应模块，type更新的第一个key，next为可选的第二个key,value为更新的值
    commonUpdate(state, payload) {
      const { module, type, next, value } = payload;
      if (next) {
        state[module][type][next] = {
          ...state[type][next],
          ...value,
        };
      } else {
        state[module][type] = {
          ...state[type],
          ...value,
        };
      }
    },
  },
  actions: {},
  modules: {
    auth
  },
});