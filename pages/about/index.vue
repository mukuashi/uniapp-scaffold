<template>
  <view class="about">
    <kp-navbar left/>
    <view class="about-content">
      <h1>
        <kp-avatar size="180" :image="app.images.logo" @tap="handleCommonModal('guideLanguage')"/>
      </h1>
      <h2>
        {{app.name}}
        <text>{{ app.abstract }}</text>
      </h2>
      <h3>
        <text v-for="(row,index) in app.mission" :key="index">{{row}}</text>
      </h3>
      <h4>浅子出品</h4>
      <ul>
        <li v-for="(row,index) in app.products" :key="index">
          <kp-author
            :extra="row.type==='miniprogram' ? 'miniprogram' : true"
            :avatar="row.image"
            :icon="row.icon"
            icon-size="46"
            :title="row.title"
            :info="row.info"
            :avatar-bg="row.color"
            :avatar-gradient="row.gradient"
            @navigate="handleOpenItem(row)"
          />
        </li>
      </ul>
      <h4>关注我们</h4>
      <ul>
        <li v-for="(row,index) in app.attention" :key="index">
          <kp-author
            :extra="row.type==='wechat' ? 'wechat' : true"
            :avatar="row.image"
            :icon="row.icon"
            icon-size="46"
            :title="row.title"
            :info="row.info"
            @navigate="handleOpenItem(row)"
          />
        </li>
      </ul>
      <h4>更多设置</h4>
      <ul>
        <li>
          <kp-author
            avatar-bg="transparent"
            icon="language"
            icon-size="60"
            title="切换语言"
            @navigate="handleCommonModal('guideLanguage')"
          >
            <view slot="extra" class="setting">
              <text>{{ language.text }}</text>
              <kp-icon size="45" type="arrow_right" color="#585860"/>
            </view>
          </kp-author>
        </li>
        <li>
          <kp-author
            extra
            avatar-bg="transparent"
            icon="pay"
            icon-size="56"
            title="鼓励一下"
            @navigate="handleEncourage"
          />
        </li>
      </ul>
    </view>
    <view class="about-footer">
      <button plain hover-class="none" open-type="feedback">意见反馈</button>
    </view>
    <!-- 小交互 -->
    <kp-actionsheet
      item-inline
      :tips="feedback.contact.tips || (feedback.contact.qrcode ? '温馨提示：长按识别或保存微信相册扫一扫 ❤️':'作品链接已复制，小程序内暂不支持打开外链（😴）君若有意·何乎山水 => 打开浏览器欣赏吧')"
      :tips-image="feedback.contact.qrcode"
      :item-list="feedback.contact.switch ? feedback.guideCtList : []"
      v-model="feedback.guideAction"
      @cancel="feedback.guideAction=false"
    />
    <kp-actionsheet
      tips="切换语言首选项"
      :item-list="languageGroup"
      v-model="feedback.guideLanguage"
      @cancel="feedback.guideLanguage=false"
      @confirm="handleSelectLanguage"
    />
  </view>
</template>
<style lang="less" scoped src="./index.less"></style>
<style>
page {
  background-color: #11121c;
}
</style>
<script>
import config from "@/config";
import { mapState, mapMutations } from "vuex";
import KpIcon from "@/components/kp-icon";
import KpNavbar from "@/components/kp-navbar";
import KpAvatar from "@/components/kp-avatar";
import KpAuthor from "@/components/kp-author";
import KpActionsheet from "@/components/kp-actionsheet";
//
export default {
  components: {
    KpIcon,
    KpNavbar,
    KpAvatar,
    KpAuthor,
    KpActionsheet
  },
  data() {
    return {
      languageGroup: [
        {
          type: "English",
          text: "English"
        },
        {
          type: "Chinese",
          text: "简体中文"
        }
      ].map(row => {
        return {
          ...row,
          color: row.type === this.$store.state.app.language && "#07C160"
        };
      }),
      // 小交互集合
      feedback: {
        guideLanguage: false,
        guideAction: false, //vpn限制社区的提示
        guideCtList: [
          { text: "联系我们", color: "#07C160", opentype: "contact" }
        ]
      }
    };
  },
  computed: {
    language() {
      return this.languageGroup.find(
        row => row.type === this.$store.state.app.language
      );
    },
    ...mapState(["app"])
  },
  onShareAppMessage(options) {
    const { name, brand, shares } = this.$store.state.app;
    return {
      title: shares.title,
      path: "pages/about/index"
    };
  },
  methods: {
    handleCommonRoute(path) {
      uni.navigateTo({
        url: path
      });
    },
    handleOpenItem(item) {
      // 优先级 appid > path > target > url
      // 优先打开其他小程序 > 当前小程序内页面 > 可在app内打开的h5 > 不可在app内打开的h5（action-sheet引导方式）
      if (item.appid) {
        return uni.navigateToMiniProgram({
          appId: item.appid,
          path: item.path,
          success(res) {
            // 打开成功
          }
        });
      }
      //
      if (item.path) return this.handleCommonRoute(item.path);
      //
      if (item.target)
        return this.handleCommonRoute(
          `/pages/webview/index?url=${item.target}`
        );
      //
      uni.setClipboardData({
        data: item.url,
        success: res => {
          // 带联系信息url > 保存二维码 > 默认项
          this.feedback = {
            ...this.feedback,
            ...item,
            contact: item.contact || {},
            guideAction: true
          };
        }
      });
    },
    handleSelectLanguage(item) {
      let curLanguage = this.languageGroup[item].type,
        prevLanguage = this.$store.state.app.language;
      // 改变语言再触发以下
      if (curLanguage !== prevLanguage) {
        // 触发全局更新语言事件
        uni.$emit("updateLanguage", prevLanguage);
        //
        this.languageGroup = this.languageGroup.map(row => {
          return {
            ...row,
            color: row.type === curLanguage && "#07C160"
          };
        });
        // https://vuex.vuejs.org/zh/guide/mutations.html
        this.$store.commit("changeLanguage", curLanguage);
        uni.setStorage({
          key: `${config.key}_language`,
          data: curLanguage,
          success: () => {
            uni.showToast({
              title: `${this.languageGroup[item].text}已配置`,
              icon: "success"
            });
          }
        });
      }
    },
    // 公共交互打开（true）或关闭（false）
    handleCommonModal(type, action = true) {
      if (type in this.feedback) {
        this.feedback[type] = action;
      } else {
        this.$set(this.feedback, type, action);
      }
    },
    handleEncourage() {
      // update config
      this.feedback.contact = {
        switch: true, //是否开启联系客服开关
        tips: "送人玫瑰，手留余香 🌹",
        qrcode:
          "https://mmbiz.qpic.cn/mmbiz_jpg/g7N4GSDkLL4kV3mcOTYn6Zdc2459rib6dWmzVCibVgYMbTBCibKShicjiaGneUQqg3sSatd6BFeLHKKpIV11pq7Ttjg/0?wx_fmt=jpeg"
      };
      //
      this.handleCommonModal("guideAction");
    }
  }
};
</script>