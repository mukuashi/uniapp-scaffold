import app from "@/config";
import storage from "@/utils/storage";
import { isInPolygon, getRandomItem } from "@/utils";
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      navbar: {
        left: {
          path: "/pages/home/index",
          tabBar: true
        }
      },
      systemInfo: this.systemInfo,
      // 小交互
      feedback: {
        // 位置授权
        lbsAuth: false,
        lbsAuthList: [
          {
            text: "去授权",
            opentype: "openSetting"
          }
        ]
      }
    };
  },
  computed: {
    gradient() {
      return getRandomItem(app.gradients);
    },
    ...mapState({
      app: state => state.app
    })
  },
  methods: {
    ...mapMutations(["userInfoMutation"]),
    /**
     * https://developers.weixin.qq.com/miniprogram/dev/api/open-api/miniprogram-navigate/wx.navigateToMiniProgram.html
     * @param {*} item appId、path、envVersion等
     */
    handleOpenMiniprogram(item = {}) {
      uni.navigateToMiniProgram({
        appId: item.appid,
        path: item.path ? decodeURIComponent(item.path) : item.path,
        envVersion: item.envVersion || "release",
        success(res) {
          // 打开成功
        }
      });
    },
    /**
     * 经纬度
     */
    handleLocationChange(type = "default") {
      const { longitude: MOClongitude, latitude: MOClatitude } = storage.get(
        "MOCK_LOC"
      );
      uni.getLocation({
        type: "gcj02",
        success: res => {
          const { longitude, latitude } = res;
          const point = {
            longitude: MOClongitude || longitude,
            latitude: MOClatitude || latitude
          };
          this.userInfoMutation(point);
          // 根据定位判断当前位置是否在景区内
          this.handleCheckInsideScenic(type);
        },
        fail: err => {
          if (err.errMsg && err.errMsg.includes("fail auth")) {
            this.feedback.lbsAuth = true;
          }
        }
      });
    },
    /**
     * 判断当前位置是否在景区内
     */
    handleCheckInsideScenic(type, times = 3) {
      const { aoi } = this.scenic;
      const { longitude, latitude } = this.user;
      if (aoi && aoi.length) {
        const insideScenic = isInPolygon({ longitude, latitude }, aoi);
        this.userInfoMutation({ insideScenic });
        if (!insideScenic) {
          // 手动触发定位
          if (type === "location") {
            uni.showToast({
              title: "您好像不在景区里呢～",
              icon: "none"
            });
          }
        }
      } else if (times) {
        setTimeout(_ => {
          times--;
          this.handleCheckInsideScenic(type, times);
        }, 500);
      }
    },
    /**
     * 查询节点信息
     * 封装自uni的nodesRef.boundingClientRect，内部使用Promise，可以让用户同步获取节点信息
     * selector <String> 此参数为元素节点，可以是id或者class，比如"#user-name"，".box"
     * all <Boolean> 是否返回全部节点信息，当页面有多个相同selector的元素时，all为true，会以数组形式返回所有节点的信息(结果为数组，数组元素为对象)，否则只返回第一个节点的信息(结果为一个对象)
     */
    handleGetRect(selector, all) {
      return new Promise(resolve => {
        uni
          .createSelectorQuery()
          .in(this)
          [all ? "selectAll" : "select"](selector)
          .boundingClientRect(rect => {
            if (all && Array.isArray(rect) && rect.length) {
              resolve(rect);
            }
            if (!all && rect) {
              resolve(rect);
            }
          })
          .exec();
      });
    },
    /**
     * 返回上一页
     */
    handleNavigateBack(params = { delta: 1 }) {
      uni.navigateBack(params);
    },
    /**
     * 公共路由管理
     * @param {*} path
     * @param {*} isTabBar
     */
    handleCommonRoute(path, isTabBar = false) {
      // isTabBar为true时切回首页
      if (isTabBar) return uni.switchTab({ url: path });
      uni.navigateTo({
        url: path
      });
    },
    /**
     *
     * @param {*} val 复制文本
     * @param {*} showToast 复制成功后是否展示toast
     */
    handleCommonCopy(val, showToast = true, icon = "success") {
      uni.setClipboardData({
        data: val,
        success: () => {
          uni.hideToast();
          if (showToast) {
            uni.showToast({
              title: val,
              icon
            });
          }
        }
      });
    },
    /**
     * 灯塔上报埋点
     */
    handleCommonBeacon(type, value) {
      const { openid } = this.user;
      this.$beacon.onUserAction(
        type,
        value && !value.openid
          ? value
          : {
              openid,
              ...value
            }
      );
    }
  }
};
