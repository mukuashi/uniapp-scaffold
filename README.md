# uniapp-scaffold | 跨平台小程序脚手架

## 简介

- uniapp-scaffold 是一款跨平台小程序脚手架，配备一定基础UI库和规范的插拔式应用框架。

#### 特点：

* **全：** 一套code，实时打包输出各端小程序 + h5 + app
* **简：** Vue写法，内置基础组件库和Vuex、Services、Utils等丰富能力

### 调研

基于跨平台小程序框架+ kpui(一个不断完善的组件库)的mini app（小程序 + h5 + app)
- 当前混合版仅上线百度、头条、支付宝、微信等相关平台，更多动态请参观uni-app官网或联系脚手架作者

### Guides | 参考资料

- [uni-app文档](https://uniapp.dcloud.io)
- [微信官方小程序文档](https://developers.weixin.qq.com/miniprogram/dev/)
- [微信小程序API](https://developers.weixin.qq.com/miniprogram/dev/api/)
- [头条小程序文档](https://developer.toutiao.com/docs/framework/)
- [百度小程序文档](https://smartprogram.baidu.com/docs/develop/fuctionlist/list/)
- [支付宝小程序文档](https://mini.open.alipay.com/channel/miniIndex.htm)
- [airbnb javascript standard](https://github.com/airbnb/javascript)
- [Ant Design introduce](https://ant.design/docs/spec/introduce-cn)
- [JD Front-End Coding Guidelines](https://guide.aotu.io)
- [React系多端统一开发解决方案](https://taro.aotu.io)

### Dev | 开发姿势

1. 工具，先下载各平台开发工具（IDE），https://uniapp.dcloud.io/quickstart
   
2. 在Hbuilder中导入当前项目（uni-app类型），修改或更新当前配置，manifest.json和pages.json

3. 配置插件，菜单栏点击插件管理可以安装当前项目所需要的插件和loader，（less、babel、es6等），npm insatll （步骤3不分先后）

4. 菜单栏点击运行到要开发的小程序平台，不习惯当前IDE的可以切换到VS Code，同步开发，实时编译
   
5. 进入各家开发者后台，提审，发布
   
6. 更多补充中

### 注意事项/坑

1. 使用Vue.js注意事项 https://uniapp.dcloud.io/use
2. 根据不同平台小程序做条件编译（非常重要）https://uniapp.dcloud.io/platform
3. 高级开发技巧 https://uniapp.dcloud.io/snippet
4. 性能优化建议 https://uniapp.dcloud.io/performance

####头条
1. 视频 video 相关
 - video 组件必须有高 height，不能是 min-height，否则 iOS 下播放有声音没视频
2. 样式相关
 - iconfont 在字节跳动小程序组件内引入字体会失效，解决方式：[在App.vue内的style节点引入](https://github.com/dcloudio/uni-app/issues/553#issuecomment-511271165)
3. 自定义组件
 - props 不能传引用，只能传值。子组件里修改了 props 对象里的属性，不会同步父组件
4. 网络相关
 - JSON 返回中会遇到换行符导致解析失败，需要在 request 阶段过滤这几种换行符
 

### Publish | 测试/工具

1. 已接入Eslint等基础插件，组件测试、单元测试等看收益再接入
2. 暂时没有集成自动化构建和代码上传工具，只是对应编译并上传到各自的开发者后台，后期有时间可以计划找API集成一下
3. 更多补充中 


### Structure

```
├── Project(Core Code)       # project name
│ ├── /config/               # 环境及基础配置
│ ├── /cdn_files/            # 项目图片及静态资源CDN
│ ├── /components/           # 公共组件库: UI + 部分业务组件
│ ├── /pages/                # 主要业务
│ ├── /services/             # 服务api，建议按照业务模块拆分
│ ├── /styles/               # 全局样式 => core + mixin + function + theme...
│ ├── /utils/                # 全局工具函数 => request + tool等
│ ├── /store/                # 数据流层
│ ├── /node_modules/         # npm依赖包
│ ├── /unpackage/            # 编译后多个平台的源码
│ │──page.json               # 全局配置，类似app.json
│ │──manifest.json           # app配置
│ │──main.js                 # 全局入口js index
│ │──App.vue                 # 全局入口vue index
```
更多补充中

!> Request.js 库：基于原生request和uni-request等再封装的一款请求库，支持拦截、异步、捕捉错误等统一处理的能力，如需业务扩展可直接联系脚手架作者；

!> Theme Less 主题库：整个app的主题库，由theme、mixin、reset等基础配置样式组成，支持业务方自定义自己的主题库；

### 技术维护

mukuashi@icloud.com

### License

[MIT](http://opensource.org/licenses/MIT)