<template>
  <view class="home">
    <kp-navbar v-if="tabs.scrollTop<300">
      <template slot="left">
        <kp-icon type="set_filled" size="50" @click="handleCommonRoute('/pages/about/index')"/>
      </template>
    </kp-navbar>
    <view class="home-header">
      <swiper
        circular
        class="gallery"
        interval="6000"
        :current="home.galleryIndex"
        @change="handleSwiperChange"
        @transition="handleSwiperTarget"
        @animationfinish="handleSwiperFinish"
      >
        <swiper-item v-for="(item,index) in home.gallery" :key="index">
          <image :src="item" lazy-load mode="aspectFill">
        </swiper-item>
      </swiper>
      <!-- 自定义滑动指示点 -->
      <view class="dots">
        <view class="dots-count">
          <text>{{ home.galleryIndex+1 }}</text>
          \{{ home.gallery.length }}
        </view>
        <kp-swiper
          v-model="home.gallery"
          :dotsIndex="home.galleryIndex"
          :dotsDirection="home.galleryDirection"
          @update="val=>home.galleryIndex=val"
        />
      </view>
      <!-- 多次点赞动画 -->
      <view :class="['hearts',user.likeAnimate&&'hearts-animate']" v-if="user.likeClick>1">
        <view v-for="index in 2" :key="index">
          <kp-icon type="heart_beat" size="60" color="#f66"/>
        </view>
      </view>
      <!-- author -->
      <view class="subject">
        <ul class="subject-left">
          <li>
            <view class="left-title">{{ app.name }}</view>
            <kp-tag size="small" bg-color="#d1ebfd" weight="500" class="left-tag">
              <kp-icon size="24" type="male" color="#3bb2f3"/>
              <text>{{ app.author.age }}</text>
            </kp-tag>
            <kp-tag
              size="small"
              color="#f9796a"
              weight="500"
              bg-color="#f4dee0"
              class="left-star"
            >{{app.author.star}}</kp-tag>
          </li>
          <li>
            <kp-icon size="26" type="location"/>
            {{ app.author.position }}
          </li>
        </ul>
        <view class="subject-right" @tap="handleAuthorLike">
          <!-- 点赞后 -->
          <view class="icon icon-zoom" v-if="user.liked">
            <kp-icon type="heart_filled" size="60" color="#f44"/>
          </view>
          <!-- 未点赞 -->
          <view v-else class="icon">
            <view class="animation-heartBeat">
              <kp-icon type="heart" size="60" color="#f44"/>
            </view>
            <view class="ripple" v-for="index in 2" :key="index"/>
          </view>
          <view :class="['icon-hearts',user.likeClick&&'icon-hearts-liked']">
            <span
              v-for="index in 6"
              :key="index"
              :style="{
                animationDelay: `${index*0.05}s`
              }"
            >
              <kp-icon type="heart_filled" size="22" color="#f44"/>
            </span>
          </view>
        </view>
      </view>
    </view>
    <view class="home-content">
      <kp-sticky :scrollTop="tabs.scrollTop" :sticky-height="tabs.stickyHeight" bg-color="#fff">
        <template slot="header">
          <scroll-view
            class="tabs-nav"
            scroll-x
            scroll-with-animation
            :scroll-left="tabs.scrollLeft"
          >
            <view
              v-for="(item,index) in app.tabs"
              :key="index"
              :class="['tabs-nav-item',Number(tabs.current)===index && 'active'] "
              :data-current="index"
              @tap.stop="e=>handleSwitchTab(e,'nav')"
            >
              <text class="title">{{item}}</text>
            </view>
          </scroll-view>
        </template>
        <template slot="content">
          <swiper
            circular
            duration="300"
            class="tabs-main"
            :current="tabs.current"
            :style="{
              height: `${tabs.swiperNodeList[tabs.current].height}px`
            }"
            @change="e=>handleSwitchTab(e,'main')"
          >
            <swiper-item class="tabs-main-content" v-for="(item,sIndex) in app.tabs" :key="sIndex">
              <!-- 基础组件 -->
              <ul class="swiper-content" v-if="!sIndex">基础组件（这周补充中）</ul>
              <!-- 业务组件 -->
              <ul class="swiper-content" v-if="Number(sIndex)===1">业务组件（这周补充中）</ul>
              <ul class="swiper-content" v-if="Number(sIndex)===2">
                <li>
                  <view class="title">
                    <kp-badge class="title-dot" dot/>
                    <h2>Station</h2>
                  </view>
                  <text>{{app.abstract}}</text>
                </li>
                <li>
                  <view class="title">
                    <kp-badge class="title-dot" dot bg-color="#f5624f"/>
                    <h2>Introduce</h2>
                  </view>
                  <text>{{ app.introduce }}</text>
                </li>
                <li>
                  <view class="title">
                    <kp-badge class="title-dot" dot bg-color="#4facfe"/>
                    <h2>Founder</h2>
                  </view>
                  <text>{{ app.author.founder }}</text>
                </li>
                <li>
                  <view class="title">
                    <kp-badge class="title-dot" dot bg-color="#e71e8e"/>
                    <h2>Services</h2>
                  </view>
                  <text>{{ app.services }}</text>
                </li>
                <li>
                  <view class="title">
                    <kp-badge class="title-dot" dot bg-color="#46e3ac"/>
                    <h2>Labels</h2>
                  </view>
                  <kp-tag
                    v-for="(row,index) in app.labels"
                    :key="index"
                    class="detail-labels"
                    type="grey"
                    shape="circle"
                  >{{row}}</kp-tag>
                </li>
                <li>
                  <view class="title">
                    <kp-badge class="title-dot" dot bg-color="#a6c1ee"/>
                    <h2>Teamwork</h2>
                  </view>
                  <view class="detail-team">
                    <view v-for="(row,index) in app.team" :key="index" class="detail-team-item">
                      <kp-avatar
                        :image="row.avatar"
                        size="large"
                        mode="aspectFill"
                        @tap="handleOpenCommunity(row)"
                      />
                      <text>{{row.role}}</text>
                    </view>
                  </view>
                </li>
              </ul>
            </swiper-item>
          </swiper>
        </template>
      </kp-sticky>
    </view>
    <view class="home-footer tpl-boxshadow">
      <button hover-class="none" @tap="feedback.guideShare=true">
        <kp-icon type="share" size="45"/>
        <text>{{ app.footer.buttons[0] }}</text>
      </button>
      <button hover-class="none" open-type="contact">
        <kp-icon type="message" size="55"/>
        <text>{{ app.footer.buttons[1] }}</text>
      </button>
    </view>
    <!-- 小交互 -->
    <!-- 引导关注等 -->
    <kp-actionsheet
      :tips="feedback.guideTipsConfig.text"
      :tips-image="feedback.guideTipsConfig.image"
      :item-list="[]"
      v-model="feedback.guideTips"
      @cancel="()=>{
        feedback.guideTips=false
        feedback.guideTipsConfig = feedback.guideTipsTpl
      }"
    />
    <!-- 分享海报等 -->
    <kp-actionsheet
      :item-list="feedback.guideShareList"
      v-model="feedback.guideShare"
      @confirm="handleSharePoster"
      @cancel="feedback.guideShare=false"
    />
  </view>
</template>
<style lang="less" scoped src="./index.less"></style>
<script>
/*
 * Copyright (c) 2019-Now Asako Studio. All rights reseved.
 * @fileoverview | Home 主页
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2019-07-08 // Initial version.
 * @version 0.2 | 2020-02-29 // 首页swiper和小程序配置更新.
 * @version 0.3 | 2020-04-19 // 配置语言包及team info.
 * @Last Modified by: mukuashi
 * @Last Modified time: 2020-04-19 13:45:47
 */
import config from "@/config";
import { debounce } from "@/utils";
import { mapState, mapMutations } from "vuex";
// import * as Services from "@/services/home";
import KpNavbar from "@/components/kp-navbar";
import KpAvatar from "@/components/kp-avatar";
import KpSticky from "@/components/kp-sticky";
import KpSwiper from "@/components/kp-swiper";
import KpIcon from "@/components/kp-icon";
import KpTag from "@/components/kp-tag";
import KpBadge from "@/components/kp-badge";
import KpAuthor from "@/components/kp-author";
import KpSpin from "@/components/kp-spin";
import KpActionsheet from "@/components/kp-actionsheet";
//
const guideTipsTpl = {
  text:
    "作品链接已复制：小程序内暂不支持打开外链（😴）君若有意·何乎山水 => 打开浏览器欣赏吧"
};
//
export default {
  components: {
    KpNavbar,
    KpAvatar,
    KpSticky,
    KpSwiper,
    KpIcon,
    KpTag,
    KpBadge,
    KpAuthor,
    KpSpin,
    KpActionsheet
  },
  data() {
    return {
      preLanguage: null,
      home: {
        gallery: [
          "/orj1080/967d9727ly3gc0whyclfoj20sg0sge0a.jpg",
          "/orj1080/967d9727ly3gc0whyfofkj20sg0sg4av.jpg",
          "/orj1080/967d9727ly3gc0whykstlj20sg0sgb29.jpg",
          "/orj1080/967d9727ly3gc0whywdupj20sg0sgb0l.jpg",
          "/orj1080/967d9727ly3gc0whysphij20sg0sgkcg.jpg",
          "/orj1080/967d9727ly3gc0whyiy96j20sg0sg1jj.jpg",
          "/orj1080/967d9727ly3gc0whz3i51j20sg0sgu0x.jpg",
          "/orj1080/967d9727ly3gc0whz6qvlj20sg0sghdt.jpg",
          "/orj1080/967d9727ly3gc0whz6yf1j20sg0sgkic.jpg"
        ].map(row => config.sinaimg + row),
        galleryIndex: 0, //相册初始化位置
        galleryDirection: "" //滑动方向
      },
      user: {
        likeClick: 0, //点赞喜欢次数，默认为0
        likeAnimate: false,
        liked: uni.getStorageSync(`${config.key}_liked`) //用户是否点过赞（点亮小红星）
      },
      tabs: {
        current: 0, //预设当前项的值
        scrollLeft: 0, //tab标题的滚动条位置
        scrollTop: 0, //页面滚动距离顶部高度
        stickyHeight: this.CustomBar, //顶部导航栏自定义高度，App.vue注入
        swiperNodeList: [] // swiper node节点
      },
      // 小交互集合
      feedback: {
        guideTips: false, //vpn限制社区的提示
        guideTipsTpl,
        guideTipsConfig: { ...guideTipsTpl },
        guideShare: false, //分享弹窗设置
        guideShareList: [
          { text: "分享给朋友", opentype: "share" },
          { text: "生成分享海报", color: "#07C160" }
        ]
      },
      // 不同社区的entry list
      entry: {}
    };
  },
  computed: {
    ...mapState(["app"])
  },
  onLoad(options) {
    // hide tabbar
    uni.hideTabBar();
    if (options.tab) {
      this.tabs.current = options.tab;
    }
    uni.$on("updateLanguage", this.updateLanguage);
  },
  onShow() {
    // 每次切换语言需重新计算整个swiper content高度
    const { language } = this.$store.state.app;
    if (this.preLanguage && this.preLanguage !== language) {
      this.handleSwiperHeight();
    }
  },
  onReady() {
    // init data
    this.handleSwiperHeight();
  },
  onUnload() {
    uni.$off("updateLanguage");
  },
  onShareAppMessage(options) {
    const { name, brand, shares } = this.$store.state.app;
    return {
      title: shares.title,
      path: "pages/home/index"
    };
  },
  methods: {
    updateLanguage(data) {
      this.preLanguage = data;
    },
    handleSwiperHeight() {
      uni
        .createSelectorQuery()
        .selectAll(".swiper-content")
        .boundingClientRect(data => {
          this.tabs.swiperNodeList = data.map(row => {
            return {
              ...row,
              height: row.height + 50
            };
          });
        })
        .exec();
    },
    handleSwiperChange(e) {
      // https://developers.weixin.qq.com/miniprogram/dev/component/swiper.html
      // source为touch时由用户触摸引起
      if (e.detail.source === "touch") {
        this.home.galleryIndex = e.target.current;
      }
    },
    handleSwiperTarget(e) {
      this.home.galleryDirection =
        (e.detail.dx > 0 && "left") || (e.detail.dx < 0 && "right");
    },
    handleSwiperFinish(e) {
      if (!e.detail.source) {
        this.home.galleryDirection = "";
      }
    },
    handleAuthorLike() {
      const { liked, likeClick } = this.user;
      let system = uni.getSystemInfoSync();
      const { brand, model } = system;
      let value = `${brand}-${model}-${Date.now()}=> ${likeClick + 1} times`;
      uni.setStorage({
        key: `${config.key}_liked`,
        data: value,
        success: () => {
          // 轻触震动小交互
          uni.vibrateShort({
            success: () => {
              // console.log("Thanks for your like！");
            }
          });
          //#ifdef MP-WEIXIN
          // 针对微信平台的埋点
          wx.reportAnalytics("click_home_confession", {
            love_count: likeClick + 1
          });
          //#endif
        }
      });
      this.user = {
        liked: value,
        likeClick: likeClick + 1,
        likeAnimate: true
      };
      if (liked) {
        debounce(
          setTimeout(() => {
            this.user.likeAnimate = false;
          }, 5000)
        );
      }
    },
    handleSwitchTab(e, type) {
      let cur;
      if (type === "nav") {
        cur = e.currentTarget.dataset.current;
        if (this.tabs.current == cur) {
          return false;
        }
      }
      if (type === "main") {
        if (this.tabs.current == e.detail.current) {
          return false;
        }
        cur = e.detail.current;
      }
      this.tabs.current = cur;
    },
    handleOpenMiniprogram(item) {
      // 因小程序内打开能力限制10个，故一部分小程序用action-sheet图片引导方式代替
      if (!item.disable) {
        if (item.appid) {
          uni.navigateToMiniProgram({
            appId: item.appid,
            path: item.path,
            success(res) {
              // 打开成功
            }
          });
        }
      } else {
        this.handleOpenGuide(item);
      }
    },
    handleOpenCommunity(item) {
      // 优先级 appid > path > target > url
      // 优先打开其他小程序 > 当前小程序内页面 > 可在app内打开的h5 > 不可在app内打开的h5（action-sheet引导方式）
      if (item.type === "miniprogram" && item.appid) {
        return this.handleOpenMiniprogram(item);
      }
      if (item.target) {
        return this.handleCommonRoute(
          `/pages/webview/index?url=${item.target}`
        );
      }
      if (item.tipsImg) {
        return this.handleOpenGuide(item);
      }
      uni.setClipboardData({
        data: item.url,
        success: res => {
          this.handleOpenGuide(item);
        }
      });
    },
    handleOpenGuide(item) {
      if (item.tipsImg) {
        this.feedback.guideTipsConfig = {
          text: "温馨提示：长按识别或保存微信相册扫一扫 ❤️",
          image: item.tipsImg
        };
      }
      this.feedback.guideTips = true;
    },
    handleCommonRoute(path) {
      uni.navigateTo({
        url: path
      });
    },
    // 分享海报
    handleSharePoster(val) {
      // 0直接分享给好友，1生成分享海报
      switch (val) {
        case 1:
          this.handleCommonRoute("/pages/poster/index");
          break;
        case 0:
        default:
          break;
      }
      setTimeout(_ => {
        this.feedback.guideShare = false;
      }, 500);
    }
  }
};
</script>