<template>
  <view class="home">
    <ad-navbar
      v-if="tabs.scrollTop<300"
      left="/pages/about/index"
      left-icon="set_filled"
      left-icon-size="50"
    />
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
        <ad-swiper
          v-model="home.gallery"
          :dotsIndex="home.galleryIndex"
          :dotsDirection="home.galleryDirection"
          @update="val=>home.galleryIndex=val"
        />
      </view>
      <!-- 多次点赞动画 -->
      <view :class="['hearts',user.likeAnimate&&'hearts-animate']" v-if="user.likeClick>1">
        <view v-for="index in 2" :key="index">
          <ad-icon type="heart_beat" size="60" color="#f66"/>
        </view>
      </view>
      <!-- author -->
      <view class="subject">
        <ul class="subject-left" @tap="handleCommonRoute('../about/index')">
          <li>
            <view class="left-title">{{ app.name }}</view>
            <ad-tag size="small" bg-color="#d1ebfd" weight="500" class="left-tag">
              <ad-icon size="21" type="male" color="#3bb2f3"/>
              <text>{{ app.author.age }}</text>
            </ad-tag>
            <ad-tag size="small" color="#f9796a" weight="500" bg-color="#f4dee0">{{app.author.star}}</ad-tag>
          </li>
          <li>
            <ad-icon size="26" type="location"/>
            {{ app.author.position }}
          </li>
        </ul>
        <view class="subject-right" @tap="handleAuthorLike">
          <!-- 点赞后 -->
          <view class="icon icon-zoom" v-if="user.liked">
            <ad-icon type="heart_filled" size="60" color="#f44"/>
          </view>
          <!-- 未点赞 -->
          <view v-else class="icon">
            <view class="animation-heartBeat">
              <ad-icon type="heart" size="60" color="#f44"/>
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
              <ad-icon type="heart_filled" size="22" color="#f44"/>
            </span>
          </view>
        </view>
      </view>
    </view>
    <view class="home-content">
      <ad-sticky :scrollTop="tabs.scrollTop" bg-color="#fff">
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
              height: `${tabs.swiperNodeList[tabs.current] && tabs.swiperNodeList[tabs.current].height || 750}px`
            }"
            @change="e=>handleSwitchTab(e,'main')"
          >
            <swiper-item class="tabs-main-content" v-for="(item,sIndex) in app.tabs" :key="sIndex">
              <ul class="swiper-content" v-if="!sIndex">
                <li class="sc1">
                  <view class="title">
                    <ad-badge class="title-dot" dot/>
                    <h2>Station</h2>
                  </view>
                  <text>{{app.abstract}}</text>
                </li>
                <li>
                  <view class="title">
                    <ad-badge class="title-dot" dot bg-color="#f5624f"/>
                    <h2>Introduce</h2>
                  </view>
                  <text>{{ app.introduce }}</text>
                </li>
                <li>
                  <view class="title">
                    <ad-badge class="title-dot" dot bg-color="#e71e8e"/>
                    <h2>Services</h2>
                  </view>
                  <text>{{ app.services }}</text>
                </li>
                <li>
                  <view class="title">
                    <ad-badge class="title-dot" dot bg-color="#46e3ac"/>
                    <h2>Labels</h2>
                  </view>
                  <ad-tag
                    v-for="(row,index) in app.labels"
                    :key="index"
                    class="detail-labels"
                    type="grey"
                    shape="circle"
                  >{{row}}</ad-tag>
                </li>
                <li>
                  <view class="title">
                    <ad-badge class="title-dot" dot bg-color="#a6c1ee"/>
                    <h2>Teamwork</h2>
                  </view>
                  <view class="detail-team">
                    <view v-for="(row,index) in app.team" :key="index" class="detail-team-item">
                      <ad-avatar
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
              <ul class="swiper-content" v-if="Number(sIndex)===1">
                <li class="sc2">
                  <view class="title">
                    <h2>Components</h2>
                    <ad-icon
                      type="miniprogram"
                      size="48"
                      class="title-icon"
                      :color="app.theme.miniprogram"
                    />
                  </view>
                  <view class="club1">
                    <view
                      class="club1-item tpl-boxshadow"
                      v-for="(row,index) in app.components"
                      :key="index"
                      :style="{
                        backgroundImage: row.gradient
                      }"
                      @tap="handleCommonRoute(row.path)"
                    >
                      <ad-icon :type="row.icon" size="70"/>
                      <span>{{ row.name }}</span>
                    </view>
                  </view>
                </li>
              </ul>
              <ul class="swiper-content" v-if="Number(sIndex)===2">
                <li class="sc3">
                  <view class="title">
                    <h2>Photography Albums</h2>
                  </view>
                  <ad-spin size="huge" s-height="600" v-if="!entry._500px.length"/>
                  <view v-else class="albums">
                    <view
                      class="albums-item tpl-boxshadow"
                      v-for="(row,index) in entry._500px"
                      :key="index"
                      @tap="handleOpen500pxAlbum(row)"
                    >
                      <view
                        class="albums-item-img"
                        :style="{
                          backgroundImage: `url(${row.url.p3})`
                        }"
                      >
                        <ad-avatar
                          class="open"
                          size="small"
                          icon="miniprogram"
                          avatar-bg="#7984db"
                        />
                      </view>
                      <view class="albums-item-right">
                        <view class="top">{{ row.title }}</view>
                        <view class="bottom">
                          <text>{{ `${row.setSetCount}+` }}</text>
                          <text>More</text>
                        </view>
                      </view>
                    </view>
                  </view>
                </li>
              </ul>
            </swiper-item>
          </swiper>
        </template>
      </ad-sticky>
    </view>
    <view class="home-footer tpl-boxshadow">
      <button hover-class="none" @tap="feedback.guideShare=true">
        <ad-icon type="share" size="45"/>
        <text>{{ app.footer.buttons[0] }}</text>
      </button>
      <button hover-class="none" open-type="contact">
        <ad-icon type="message" size="55"/>
        <text>{{ app.footer.buttons[1] }}</text>
      </button>
    </view>
    <!-- 引导关注等 -->
    <ad-actionsheet
      :tips="feedback.guideTipsConfig.text"
      :tips-image="feedback.guideTipsConfig.image"
      :item-list="[]"
      v-model="feedback.guideTips"
      tips-image-preview
    >
      <swiper
        class="custom-actionsheet"
        v-if="feedback.guideTipsConfig.founder"
        indicator-dots
        autoplay
        circular
        :indicator-active-color='app.theme.default'
      >
        <swiper-item>
          <image
            webp
            show-menu-by-longpress
            mode='widthFix'
            :src="feedback.guideTipsConfig.qrcode" 
            @tap="handlePreviewImage(feedback.guideTipsConfig.qrcode)"
          />
        </swiper-item>
        <swiper-item>
          <h1>🦁</h1>
          <text>{{ app.author.founder }}</text>
        </swiper-item>
      </swiper>
    </ad-actionsheet>
    <!-- 分享海报等 -->
    <ad-actionsheet
      :item-list="feedback.guideShareList"
      v-model="feedback.guideShare"
      @confirm="handleSharePoster"
    />
  </view>
</template>
<style lang="scss" scoped src="./index.scss"></style>
<script>
/*
 * Copyright (c) 2019-Now Asako Studio. All rights reseved.
 * @fileoverview | Home 主页
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2019-07-08 // Initial version.
 * @version 0.2 | 2020-02-29 // 首页swiper和小程序配置更新.
 * @version 0.3 | 2020-04-18 // 配置语言包及team info.
 * @Last Modified by: mukuashi
 * @Last Modified time: 2021-05-29 15:18:03
 */
import { debounce } from "@/utils";
import * as Services from "@/services/home";

export default {
  data() {
    const { app } = this.$store.state
    return {
      preLanguage: null,
      home: {
        gallery: app.gallery,
        galleryIndex: 0, //相册初始化位置
        galleryDirection: "" //滑动方向
      },
      user: {
        likeClick: 0, //点赞喜欢次数，默认为0
        likeAnimate: false,
        liked: uni.getStorageSync(`${app.key}_liked`) //用户是否点过赞（点亮小红星）
      },
      tabs: {
        current: 0, //预设当前项的值
        scrollLeft: 0, //tab标题的滚动条位置
        scrollTop: 0, //页面滚动距离顶部高度
        swiperNodeList: [] // swiper node节点
      },
      // 小交互集合
      feedback: {
        guideTips: false, //vpn限制社区的提示
        guideTipsConfig: {},
        guideShare: false, //分享弹窗设置
        guideShareList: [
          { text: "分享给朋友", opentype: "share" },
          { text: "生成分享海报", color: app.theme.success }
        ]
      },
      // 不同社区的entry list
      entry: {
        params: {},
        _500px: []
      }
    };
  },
  onLoad(options) {
    // hide tabbar
    uni.hideTabBar();
    if (options.tab) {
      this.tabs.current = options.tab;
      if (Number(options.tab) === 2 && !this.entry._500px.length) {
        this.get500pxAlbumList();
      }
    }
    uni.$on("updateLanguage", this.updateLanguage);
    uni.showShareMenu({
      withShareTicket: true,
      menus: ["shareAppMessage", "shareTimeline"]
    });
  },
  onShow() {
    // 每次切换语言需重新计算整个swiper content高度
    const { language } = this.app;
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
  //页面滚动执行方式
  onPageScroll(e) {
    this.tabs.scrollTop = e.scrollTop;
  },
  onShareAppMessage(options) {
    const { shares } = this.app;
    return {
      title: shares.title,
      path: `pages/home/index?tab=${this.tabs.current}`
    };
  },
  methods: {
    updateLanguage(data) {
      this.preLanguage = data;
    },
    async get500pxAlbumList() {
      let res = await Services.get500pxAlbumListSvc();
      this.entry._500px = res.data;
    },
    handleSwiperHeight() {
      uni.createSelectorQuery().selectAll(".swiper-content").boundingClientRect(data => {
        this.tabs.swiperNodeList = data.map(row => {
          return {
            ...row,
            height: row.height + 50
          };
        });
      }).exec();
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
      const { brand, model } = this.systemInfo;
      let value = `${brand}-${model}-${Date.now()}=> ${likeClick + 1} times`;
      uni.setStorage({
        key: `${this.app.key}_liked`,
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
      if (cur === 2 && !this.entry._500px.length) {
        this.get500pxAlbumList();
      }
    },
    handleOpenMiniApp(item) {
      if (!item.disable) {
        this.handleOpenMiniprogram(item)
      } else {
        this.handleOpenGuide(item);
      }
    },
    handleOpenCommunity(item) {
      // 优先级 appid > path > target > url
      // 优先打开其他小程序 > 当前小程序内页面 > 可在app内打开的h5 > 不可在app内打开的h5（action-sheet引导方式）
      if (item.type === "miniprogram" && item.appid) return this.handleOpenMiniApp(item);
      if (item.target) return this.handleCommonRoute(`../webview/index?url=${item.target}`);
      if (item.tipsImg) return this.handleOpenGuide(item);
      uni.setClipboardData({
        data: item.url,
        success: res => {
          this.handleOpenGuide(item);
        }
      });
    },
    handleOpenGuide(item) {
      if (item.tipsImg) {
        if(item.founder) {
          this.feedback.guideTipsConfig = {
            founder: item.founder,
            qrcode: item.tipsImg
          }
        } else {
          this.feedback.guideTipsConfig = {
            image: item.tipsImg
          };
        }
        this.feedback.guideTipsConfig.text = `温馨提示：长按识别或保存到微信相册扫一扫\n${item.url || ""}`
      } else {
        this.feedback.guideTipsConfig = {
          text: `小程序内暂不支持打开当前外链，建议打开浏览器查看\n${item.url || ''}`
        };
      }
      this.feedback.guideTips = true;
    },
    // 打开500px社区
    handleOpen500pxAlbum(item) {
      let query = {
        appid: "wxfb1c0bd6179a8b50",
        path: `pages/album/album?galleryId=${item.id}`
      };
      this.handleOpenMiniApp(query);
    },
    // 分享海报
    handleSharePoster(val) {
      switch (val) {
        case 1:
          this.handleOpenMiniprogram({
            appid: 'wx1014f2e01d1623f9',
            path: 'pages/poster/index?source=asako_ued_home'
          });
          break;
        case 0:
        default:
          break;
      }
      setTimeout(_ => {
        this.feedback.guideShare = false;
      }, 500);
    },
    handlePreviewImage(val) {
      uni.previewImage({
        current: val,
        urls: Array.of(val)
      })
    }
  }
};
</script>