<template>
  <view class="poster">
    <kp-navbar left title="浅子影报"/>
    <kp-spin v-if="poster.loading" fix size="huge"/>
    <view class="poster-content" v-else>
      <view class="poster-swiper">
        <swiper
          class="swiper"
          circular
          duration="300"
          skip-hidden-item-layout
          indicator-dots
          indicator-color="#ccc"
          indicator-active-color="#623bff"
          @change="handleSwiperChange"
          previous-margin="60"
          next-margin="60"
        >
          <swiper-item
            :key="index"
            v-for="(item,index) in poster.list"
            :class="[
              'swiper-item',
              poster.current===index && 'swiper-current'
            ]"
            @tap="handleViewPhoto(item)"
          >
            <image mode="widthFix" :src="item" show-menu-by-longpress>
          </swiper-item>
        </swiper>
      </view>
      <view class="poster-footer">
        <h2>
          <kp-button
            plain
            type="primary"
            icon="download"
            iconSize="40"
            shape="circle"
            @on-click="handleSaveAlbums"
          >保存至相册</kp-button>
          <kp-button
            class="explore"
            icon="new"
            iconSize="38"
            shape="circle"
            type="primary"
            @on-click="handleOpenNewItem"
          >新版本👆</kp-button>
        </h2>
        <p>
          <text @tap="handleToggleRender">不喜欢么 换一个</text>
        </p>
      </view>
    </view>
    <poster id="poster" :config="poster.config" @success="onPosterSuccess" @fail="onPosterFail"/>
    <!-- share -->
    <kp-actionsheet
      tips="送人玫瑰，手留余香"
      :item-list="feedback.guideShareList"
      :is-cancel="false"
      v-model="feedback.guideShare"
      @confirm="feedback.guideShare=false"
      @cancel="feedback.guideShare=false"
    />
    <!-- setting -->
    <kp-actionsheet
      tips="温馨提示：保存海报请先打开相册权限再试哦"
      :item-list="feedback.guideSettingList"
      :is-cancel="false"
      v-model="feedback.guideSetting"
      @confirm="feedback.guideSetting=false"
      @cancel="feedback.guideSetting=false"
    />
  </view>
</template>
<style lang="less" scoped src="./index.less"></style>
<script>
import app from "@/config/data";
import KpButton from "@/components/kp-button";
import KpNavbar from "@/components/kp-navbar";
import KpSpin from "@/components/kp-spin";
import KpActionsheet from "@/components/kp-actionsheet";
import { getCurrentDate } from "@/utils";
import Poster from "@/wxcomponents/wxa-plugin-canvas/poster/poster";
// 海报渲染配置
const posterConfig = (random = Math.random()) => {
  let date = getCurrentDate(),
    year = date[0],
    month = date[1],
    day = date[2],
    week = date[3],
    verse = app.verses[Math.floor(random * app.verses.length)],
    bgImg = app.wallpapers[Math.floor(random * app.wallpapers.length)];
  return {
    width: 900,
    height: 1600,
    pixelRatio: 1.5, // 清晰度，默认1
    backgroundColor: "#fff",
    debug: false,
    images: [
      {
        width: 900,
        height: 1600,
        x: 0,
        y: 0,
        url: bgImg,
        zIndex: 1
      },
      // 小程序码
      {
        width: 120,
        height: 120,
        x: 390,
        y: 1370,
        borderRadius: 120,
        url:
          "https://6173-asako-studio-9c2pl-1301657606.tcb.qcloud.la/static/daily-logo_miniapp_default.jpg?sign=25fe6e7bf64fa4ec138e99626b908416&t=1585804098",
        zIndex: 2
      }
    ],
    blocks: [
      {
        x: 60,
        y: 1190,
        width: 70,
        height: 7,
        borderRadius: 7,
        backgroundColor: "#e8e8e8",
        zIndex: 2
      }
    ],
    texts: [
      {
        x: 60,
        y: 120,
        fontSize: 100,
        color: "#fff",
        text: day,
        zIndex: 2
      },
      {
        x: 63,
        y: 160,
        fontSize: 35,
        color: "#fff",
        text: `${month} • ${year}`,
        zIndex: 2
      },
      {
        x: 180,
        y: 73,
        fontSize: 30,
        color: "#fff",
        text: "周",
        zIndex: 2
      },
      {
        x: 180,
        y: 112,
        fontSize: 30,
        color: "#fff",
        text: week,
        zIndex: 2
      },
      {
        x: 60,
        y: verse.text.length <= 17 ? 1100 : 1050,
        fontSize: 40,
        color: "#fff",
        width: 990,
        lineNum: 2, //根据宽度换行，最多的行数
        lineHeight: 60,
        text: verse.text,
        zIndex: 2
      },
      {
        x: 155,
        y: 1210,
        fontSize: 40,
        fontWeight: "bold",
        color: "#e8e8e8",
        text: verse.author,
        zIndex: 2
      },
      {
        x: 282,
        y: 1560,
        fontSize: 28,
        color: "#fff",
        text: "浅子影报 • 伴你每天好心情",
        zIndex: 2
      }
    ]
  };
};
//
export default {
  components: {
    KpNavbar,
    KpButton,
    KpSpin,
    KpActionsheet
  },
  data() {
    return {
      app,
      // 小交互集合
      feedback: {
        guideShare: false, // 分享
        guideShareList: [
          { text: "鼓励一下", color: "#07C160", opentype: "share" }
        ],
        guideSetting: false, //系统设置项
        guideSettingList: [
          { text: "去授权", color: "#FA5151", opentype: "openSetting" }
        ]
      },
      poster: {
        current: 0,
        // 默认推广海报
        list: [
          "https://6173-asako-studio-9c2pl-1301657606.tcb.qcloud.la/static/poster_swiper_02.jpg?sign=02ed828c4c6d6afff769e602a6b561a4&t=1585803307",
          "https://6173-asako-studio-9c2pl-1301657606.tcb.qcloud.la/static/poster_swiper_01.jpg?sign=87c675bdde3ae1a3bc5234e416a5888c&t=1585155505"
        ],
        url: null,
        loading: true,
        config: posterConfig()
      }
    };
  },
  onLoad() {
    // prefetch render poster 初进页面就同步生成海报，若需异步需参考
    // https://github.com/jasondu/wxa-plugin-canvas
    Poster.create();
  },
  onShareAppMessage(options) {
    const { name, brand } = this.$store.state.app;
    return {
      title: `${name}@${brand} 浅子影报 • 伴你好心情 ☀️`,
      path: "pages/poster/index"
    };
  },
  methods: {
    onPosterSuccess(e) {
      const { detail } = e;
      if (detail) {
        this.poster.list.unshift(detail);
        this.poster = {
          ...this.poster,
          loading: false,
          url: detail
        };
      }
    },
    onPosterFail(e) {},
    handleSwiperChange(e) {
      const { current } = e.detail;
      this.poster.current = current;
    },
    handleViewPhoto(url) {
      uni.previewImage({
        current: url,
        urls: this.poster.list
      });
    },
    handleToggleRender() {
      // 重新随机配置
      this.poster.config = posterConfig();
      // 异步生成海报
      this.$nextTick(() => {
        Poster.create(true, this);
      });
    },
    handleSaveAlbums() {
      uni.showToast({
        title: "海报生成中 . . .",
        icon: "loading"
      });
      const { list, current } = this.poster;
      const saveImg = (url = list[current]) => {
        uni.saveImageToPhotosAlbum({
          filePath: url,
          success: res => {
            uni.showToast({
              title: "海报保存成功",
              icon: "success"
            });
            // open share
            this.feedback.guideShare = true;
          },
          fail: err => {
            // 取消保存相册 "saveImageToPhotosAlbum:fail cancel"
            uni.showToast({
              title:
                (err.errMsg.includes("cancel") && "下次别忘了保存哦") ||
                "海报保存失败",
              icon: "none"
            });
            // 拒绝保存到相册的授权引导，open setting
            if (err.errMsg.includes("auth")) this.feedback.guideSetting = true;
          }
        });
      };
      // 网络图片需要先下载，本地图片路径带tmp，value.includes("://tmp")
      if (list[current].includes("://tmp")) {
        saveImg();
      } else {
        uni.downloadFile({
          url: list[current],
          success: res => {
            if (res.statusCode === 200) {
              saveImg(res.tempFilePath);
            }
          }
        });
      }
    },
    handleOpenNewItem() {
      uni.navigateToMiniProgram({
        appId: "wxd452b156d966e65d",
        path: "pages/home/index?source=older_version",
        success(res) {
          // 打开成功
        }
      });
    }
  }
};
</script>