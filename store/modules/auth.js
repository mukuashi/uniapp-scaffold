/*
 * Copyright (c) 2020-Now Asako Studio. All rights reseved.
 * @fileoverview | User信息，比如头像、昵称、openid、地理位置等隐私
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2020-11-30 // Initial version.
 * @Last Modified by: mukuashi
 * @Last Modified time: 2021-05-03 21:11:05
 */
import app from '@/config';
import storage from '@/utils/storage';
//
export default {
  state: {
    // 用户信息
    user: storage.get(`${app.key}_user`, true),
    collection: {},
  },
  mutations: {
    userInfoMutation(state, payload = {}) {
      const { ok, retCode, msg, ...others } = payload;
      state.user = {
        ...state.user,
        ...others,
      };
      storage.set(`${app.key}_user`, state.user, true)
    }
  },
  actions: {
    
  },
};
