<template>
  <view class="about">
    <ad-navbar :left='navbar.left' />
    <view class="about-content">
      <h1>
        <ad-avatar 
          size="180" 
          :image="app.images.logo" 
          @tap="handleCommonModal('guideLanguage')"
        />
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
          <ad-author
            :extra="row.type==='miniprogram' ? 'miniprogram' : true"
            :avatar="row.avatar"
            :icon="row.icon"
            icon-size="46"
            :title="row.name"
            :desc="row.desc"
            :avatar-bg="row.gradient || row.color"
            @navigate="handleOpenItem(row)"
          />
        </li>
      </ul>
      <h4>关注我们</h4>
      <ul>
        <li v-for="(row,index) in app.attention" :key="index">
          <ad-author
            :extra="row.type==='wechat' ? 'wechat' : true"
            :avatar="row.avatar"
            :icon="row.icon"
            icon-size="46"
            :title="row.name"
            :desc="row.desc"
            @navigate="handleOpenItem(row)"
          />
        </li>
      </ul>
      <h4>更多设置</h4>
      <ul>
        <li>
          <ad-author
            avatar-bg="transparent"
            icon="language"
            icon-size="59"
            title="切换语言"
            @navigate="handleCommonModal('guideLanguage')"
          >
            <view slot="extra" class="setting">
              <text>{{ language.text }}</text>
              <ad-icon size="45" type="arrow_right" />
            </view>
          </ad-author>
        </li>
        <li>
          <ad-author
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
    <ad-actionsheet
      item-inline
      :tips="feedback.contact.tips || feedback.contact.text"
      :tips-image="feedback.contact.qrcode"
      :tips-image-preview="feedback.contact.preview"
      :item-list="feedback.contact.switch ? feedback.guideCtList : []"
      v-model="feedback.guideAction"
    />
    <ad-actionsheet
      tips="切换语言首选项"
      :item-list="languageGroup"
      v-model="feedback.guideLanguage"
      @confirm="handleSelectLanguage"
    />
  </view>
</template>
<style lang="scss" scoped src="./index.scss"></style>
<script>
import { mapMutations } from 'vuex';
export default {
  data() {
    const { app } = this.$store.state
    return {
      languageGroup: app.languages.map(row => {
        return {
          ...row,
          color:
            row.type === app.language && app.theme.success
        };
      }),
      // 小交互集合
      feedback: {
        guideLanguage: false,
        guideAction: false, //vpn限制社区的提示
        guideCtList: [
          {
            text: "联系我们",
            color: app.theme.success,
            opentype: "contact"
          }
        ]
      }
    };
  },
  computed: {
    language() {
      return this.languageGroup.find(row => row.type === this.app.language);
    }
  },
  onLoad(options) {
    // share
    uni.showShareMenu({
      withShareTicket: true,
      menus: ["shareAppMessage", "shareTimeline"]
    });
  },
  onShareAppMessage(options) {
    const { shares } = this.app;
    return {
      title: shares.title,
      path: "pages/about/index"
    };
  },
  methods: {
    ...mapMutations(['changeLanguage']),
    handleOpenItem(item) {
      // 优先级 appid > path > target > url
      // 优先打开其他小程序 > 当前小程序内页面 > 可在app内打开的h5 > 不可在app内打开的h5（action-sheet引导方式）
      if (item.appid) return this.handleOpenMiniprogram(item)
      //
      if (item.path) return this.handleCommonRoute(item.path);
      //
      if (item.target) return this.handleCommonRoute(`/pages/webview/index?url=${item.target}`);
      uni.setClipboardData({
        data: item.url,
        success: res => {
          // 带联系信息url > 保存二维码 > 默认项
          this.feedback = {
            ...this.feedback,
            ...item,
            contact: {
              ...item.contact,
              preview: true,
              text: item.contact && item.contact.qrcode
                  ? `温馨提示：长按识别或保存到微信相册扫一扫\n${item.url || ""}`
                  : `小程序内暂不支持打开当前外链，建议打开浏览器查看\n${item.url || ''}`
            },
            guideAction: true
          };
        }
      });
    },
    handleSelectLanguage(idx) {
      let curLanguage = this.languageGroup[idx].type,
          prevLanguage = this.app.language;
      // 改变语言再触发以下
      if (curLanguage !== prevLanguage) {
        this.languageGroup = this.languageGroup.map(row => {
          return {
            ...row,
            color: row.type === curLanguage && this.app.theme.success
          };
        });
        // 触发全局更新语言事件
        uni.$emit("updateLanguage", prevLanguage);  
        // https://vuex.vuejs.org/zh/guide/mutations.html
        this.changeLanguage(curLanguage);
        uni.setStorage({
          key: `${this.app.key}_language`,
          data: curLanguage,
          success: () => {
            uni.showToast({
              title: `${this.languageGroup[idx].abbr || this.languageGroup[idx].text}已配置`,
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
        preview: true, //是否开启图片点击预览模式
        tips: "送人玫瑰，手留余香 🌹",
        qrcode: `${this.app.domain.cloud.studio}/static/images/qrcode_team_encourage.jpeg`,
      };
      //
      this.handleCommonModal("guideAction");
    }
  }
};
</script>