/*
 * Copyright (c) 2019-Now Asako Studio. All rights reseved.
 * @fileoverview | Vue.config.js https://uniapp.dcloud.io/collocation/vue-config
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2020-07-13 // Initial version.
 * @Last Modified by: mukuashi
 * @Last Modified time: 2021-04-13 01:21:55
 */
module.exports = {
  // 发布时删除console
  chainWebpack: (config) => {
    // 发行或运行时启用了压缩时会生效
    config.optimization.minimizer('terser').tap((args) => {
        const compress = args[0].terserOptions.compress;
        // 非 App 平台移除 console 代码(包含所有 console 方法，如 log,debug,info...)
        compress.drop_console = true;
        compress.pure_funcs = [
            '__f__', // App 平台 vue 移除日志代码
            // 'console.debug' // 可移除指定的 console 方法
        ];
        return args;
    });
  },
  // https://cli.vuejs.org/zh/guide/css.html#css-modules
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/styles/mixin.scss";`,
      },
    },
  },
  chainWebpack: (config) => {},
};
