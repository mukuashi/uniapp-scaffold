<script>
import Vue from "vue";

export default {
  onLaunch: function(res) {
    // 小程序更新机制 https://developers.weixin.qq.com/miniprogram/dev/framework/runtime/update-mechanism.html
    const updateManager = uni.getUpdateManager();
    updateManager.onCheckForUpdate(function(res) {
      // 请求完新版本信息的回调
      console.warn(`${res.hasUpdate ? "" : "没有"}发现新版本`, res.hasUpdate);
    });
    updateManager.onUpdateReady(function(res) {
      uni.showModal({
        title: "更新提示",
        content: "发现新版本，是否重启应用？",
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate();
          }
        }
      });
    });
    updateManager.onUpdateFailed(function(res) {
      // 新的版本下载失败
      console.log("新版本下载失败");
    });
    //
    uni.getSystemInfo({
      success: function(e) {
        // #ifndef MP
        Vue.prototype.StatusBar = e.statusBarHeight;
        if (e.platform == "android") {
          Vue.prototype.CustomBar = e.statusBarHeight + 50;
        } else {
          Vue.prototype.CustomBar = e.statusBarHeight + 45;
        }
        // #endif

        // #ifdef MP-WEIXIN
        Vue.prototype.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        Vue.prototype.Custom = custom;
        Vue.prototype.CustomBar =
          custom.bottom + custom.top - e.statusBarHeight;
        // #endif

        // #ifdef MP-ALIPAY
        Vue.prototype.StatusBar = e.statusBarHeight;
        Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
        // #endif
        // 移动端胶囊原因整体高度调整一下
        Vue.prototype.CustomBar = Vue.prototype.CustomBar * 1.2;
      }
    });
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
</script>
<style lang="less">
@import "./styles/animate.less";
@import "./styles/reset.less";
</style>