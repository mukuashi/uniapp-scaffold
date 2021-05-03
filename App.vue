<script>
import Vue from "vue";

export default {
  onLaunch: function() {
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
    // 顶部导航栏、状态栏以及机型
    const systemInfo = uni.getSystemInfoSync();
    const { statusBarHeight, titleBarHeight, screenHeight, platform, model, pixelRatio, windowWidth } = systemInfo;
    if (platform === 'android') {
      systemInfo.isIphone = false;
      systemInfo.statusBarHeight = statusBarHeight || 24;
      systemInfo.customBar = (statusBarHeight + 50) * 750 / windowWidth;
    } else {
      systemInfo.isIphone = true;
      systemInfo.statusBarHeight = statusBarHeight || 20;
      systemInfo.customBar = (statusBarHeight + 45) * 750 / windowWidth;
    }
    // iphoneX及之后的iphone手机，其screenHeight最小是812，且pixelRatio最小是2。
    if (model.includes('iPhone') && screenHeight >= 812 && pixelRatio >= 2) {
      systemInfo.isIpx = true;
      systemInfo.statusBarHeight = statusBarHeight || 44;
    } else {
      systemInfo.isIpx = false;
    }
    // #ifdef MP
    const custom = uni.getMenuButtonBoundingClientRect();
    systemInfo.customBar = platform === 'ios' ? 44 : 48;
    systemInfo.menuButton = custom;
    // #endif
    // #ifdef MP-ALIPAY
    systemInfo.customBar = statusBarHeight + titleBarHeight;
    // #endif
    Vue.prototype.systemInfo = systemInfo;
    console.log(systemInfo);
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
</script>
<style lang="scss" src='./styles/index.scss'></style>