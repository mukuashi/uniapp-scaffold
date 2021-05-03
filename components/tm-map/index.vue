<template>
  <view :class="[ prefixCls ]">
    <map
      :id="`${prefixCls}-default`"
      show-location
      :theme="mapTheme"
      :longitude="map.longitude"
      :latitude="map.latitude"
      :polyline="map.polyline"
      :polygons="map.polygons"
      :markers="map.markers"
      :setting="map.setting"
      @tap="handleMapClickTap"
      @markertap="handleMarkerTap"
      @labeltap="handleMarkerTap"
      @updated="handleMapUpdated"
      @regionchange="handleRegionChange"
    />
    <!-- 语音讲解播放器 -->
    <view v-if="loading.playing" :class="[ `${prefixCls}-audio` ]">
      <span class="animation-fadeIn">
        <image
          mode="heightFix"
          :src="`${app.hosts.cos}/wanda/images/icon_audio_playing.gif`"
        />
        <text>正在播放{{ map.markers[map.current].shortname }}</text>
      </span>
      <tm-icon
        size="36"
        type="close"
        color="#333"
        @click="handleAudioManage('stop')"
      />
    </view>
    <!-- 收藏入口 -->
    <view
      v-if="showCollect"
      :class="[
        `${prefixCls}-collect`,
        loading.playing && `${prefixCls}-collect-box`
      ]"
      @tap="handleCommonAction('collect')"
    >
      <tm-avatar
        shadow
        weight
        icon="collect"
        icon-size="42"
        icon-color="#333"
        avatar-bg="#fff"
      />
    </view>
    <!-- 底部默认交互区 -->
    <view
      v-if="showDefault"
      :class="[
        `${prefixCls}-bottom`,
        mapType === 'polyline' ? `${prefixCls}-polyline-bottom` : ''
      ]"
    >
      <!-- 定位和AR等 -->
      <ul
        :class="[
          'actions',
          feedback.marker ? 'actions-box' : `${prefixCls}-animate-down`
        ]"
      >
        <!-- 是否在景区内的定位 -->
        <li @tap="handleCommonAction('location')">
          <tm-avatar
            shadow
            weight
            icon="location"
            icon-size="42"
            icon-color="#333"
            avatar-bg="#fff"
          />
        </li>
        <!-- AI助手 -->
        <li v-if="showAI" @tap="handleCommonAction('ai')">
          <tm-avatar
            size="120"
            :image="app.images.guideAR"
          />
        </li>
      </ul>
      <!-- marker卡片列表 -->
      <swiper
        v-if="feedback.marker"
        circular
        :previous-margin="mapType==='marker' ? 0 : '40rpx'"
        :next-margin="mapType==='marker' ? 0 : '40rpx'"
        :current="map.current"
        :class="[
          `${prefixCls}-card`,
          `${prefixCls}-animate`,
          animation.cancel && `${prefixCls}-animate-hidden`,
        ]"
        :style="{ minHeight: `${map.cardHeight}rpx` }"
        @change="handleSwiperChange"
      >
        <swiper-item
          v-for="(row,index) in map.markers"
          v-if="mapType==='marker' ? map.current===index : true"
          :key="index"
          :class="[ `${prefixCls}-card-${mapType}` ]"
        >
          <tm-card
            size="160"
            image-shape="square"
            class-name="card"
            :bordered="false"
            :title="row.shortname"
            :badge="mapType==='polyline' && (index+1)"
            :desc="row.distance ? `距你${row.distance}` : ''"
            :image="row.thumbnail || row.audioInfo && row.audioInfo.thumbnail || mapType==='polyline' && app.images.empty || null"
            @on-head.stop.prevent="handleCommonAction('poi',row)"
          >
            <!-- 收藏 -->
            <view v-if="showCollect" slot="extra">
              <tm-icon
                type="collect"
                size="36"
                :color="row.isSave ? theme.default : '#D9D9D9'"
                @click.stop.prevent="handlePoiCollect(row)"
              />
            </view>
            <!-- poi详情文案 -->
            <view v-if="row.full_intro" slot="desc-ps">
              {{ row.full_intro }}
            </view>
            <!-- 语音讲解及导航 -->
            <ul v-else class="card-content">
              <li
                v-if="row.audioInfo && row.audioInfo.audio"
                class="card-content-audio"
                @tap="handleAudioManage(row.audioInfo)"
              >
                <tm-button
                  icon-size="32"
                  :icon="loading.playing ? 'pause' : 'stop'"
                 :bg-color="theme.default"
                >播放讲解</tm-button>
              </li>
              <li
                @tap="handleCommonAction('lbs', row)"
              >
                <tm-button
                  icon="lbs"
                  icon-size="32"
                  :bg-color="theme.default"
                >去这里</tm-button>
              </li>
            </ul>
          </tm-card>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>
<script>
/*
 * Copyright (c) 2020-Now Asako Studio. All rights reseved.
 * @fileoverview | 基于原生Map组件的自定义
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2020-07-13 // Initial version.
 * @Date: 2020-07-13 14:21:19
 * @Last Modified by: mukuashi
 * @Last Modified time: 2021-04-06 21:40:23
 */
import { mapActions, mapState, mapMutations } from 'vuex';
import { deepClone, distanceUnit, getDistance  } from '@/utils';
import { getPoiCollectSaveSvc } from '@/services/user';
import { markersIconMap } from '@/config/markers';

export default {
  name: 'TmMap',
  props: {
    // 显示默认模块
    showDefault: {
      type: Boolean,
      default: true,
    },
    // 显示收藏入口
    showCollect: {
      type: Boolean,
      default: false,
    },
    // 显示AI入口
    showAI: {
      type: Boolean,
      default: false,
    },
    // 显示停车模块
    showPark: {
      type: Boolean,
      default: false,
    },
    // 地图主题（目前支持手绘图 handDraw ）
    mapTheme: String,
    // 目前支持 marker（默认）、polyline、boundary等模式
    mapType: {
      type: String,
      default: 'marker',
    },
    // map初始化配置数据
    mapData: {
      type: Object,
      default: () => {},
    },
    // 当前选中marker的id
    markerIndex: {
      type: Number,
      default: -1,
    },
    // marker 样式
    markerStyle: {
      type: Object,
      default: () => {},
    },
    // map marker icon
    markerIcon: {
      type: String,
      default: markersIconMap.spot,
    },
    // 点聚合
    mapClusters: {
      type: Boolean,
      default: false,
    },
    // 聚合簇样式
    mapClusterStyle: {
      type: Object,
      default: () => {},
    },
    // 个性化地图配置项
    mapSetting: {
      type: Object,
      default: () => {},
    },
    // 禁止map点击事件
    mapDisable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    const { app } = this.$store.state;
    return {
      prefixCls: `${app.prefix}-map`,
      map: {
        polyline: [],
        points: [],
        markers: [],
        current: 0,
        polygons: [],
        setting: {
          enablePoi: false,
          scale: 16, // 缩放级别，取值范围为3-20
          ...this.mapSetting,
        },
      },
      // 小交互
      feedback: {
        marker: false,
        collect: false,
      },
      loading: {
        playing: false,
      },
      animation: {
        cancel: false,
      },
      // 缓存数据
      caches: {
        markerClusterBg: `${app.hosts.cos}/wanda/images/marker-icon/marker_cluster.png`,
      },
    };
  },
  computed: mapState({
    theme: state => state.guide.theme,
    roadmap: state => state.guide.roadmap,
    poi: state => state.guide.poi,
  }),
  watch: {
    mapData(newVal, oldVal) {
      if (oldVal.pois && newVal !== oldVal) {
        this.getMapPoiList();
      }
    },
    markerIndex(newVal, oldVal) {
      if (newVal === -1) {
        this.resetMarkers();
        return;
      };
      const { map: { markers }, markerStyle } = this;
      if (markers[newVal].width !== markerStyle.width) return;
      if (newVal !== oldVal) {
        const param = {
          detail: {
            markerId: newVal,
          },
        };
        this.handleMarkerTap(param);
      }
    },
  },
  created() {
    this.mapCtx = uni.createMapContext(`${this.prefixCls}-default`, this);
    // 全局唯一的背景音频管理器
    this.backgroundAudioManager = uni.getBackgroundAudioManager();
    if (this.mapClusters) {
      uni.downloadFile({
        url: this.caches.markerClusterBg,
        success: (res) => {
          if (res.statusCode === 200) {
            this.caches.markerClusterBg = res.tempFilePath;
          }
        },
        complete: () => {

        },
      });
    }
  },
  mounted() {
    this.handleMapInit();
  },
  methods: {
    ...mapMutations(['commonUpdate']),
    ...mapActions(['poiDetail']),
    /**
     * map init
     */
    handleMapInit() {
      this.getMapPoiList();
    },
    /**
     * poi marker
     */
    getMapPoiList() {
      // reset audio
      if (this.loading.playing) this.backgroundAudioManager.stop();
      // reset card
      if (this.feedback.marker) this.feedback.marker = false;
      const { pois } = this.mapData;
      this.map = {
        ...this.map,
        ...this.mapData,
        markers: this.handleMarkersFactory(pois),
        markersCache: this.handleMarkersFactory(pois),
        points: pois.map(row => row.point || { latitude: row.latitude, longitude: row.longitude }),
      };
      const { latitude, longitude, poi, markers } = this.map;
      switch (this.mapType) {
        // 路线模式，默认弹出第一个poi
        case 'polyline':
          const curItem = {
            detail: {
              markerId: 0,
            },
          };
          this.handleMarkerTap(curItem);
          break;
        // marker模式
        case 'marker':
          // marker模式下缩放视野展示所有经纬度（非激活对应poi时）
          if (!poi) {
            setTimeout((_) => {
              this.handleMarkerIncludePoints(this.map.points);
            }, 20);
          }
          break;
        // boundary模式
        case 'boundary':
          if (this.map.polygons[0]?.points) this.handleMarkerIncludePoints(this.map.polygons[0]?.points);
          break;
        default:
          break;
      }
      // 点聚合模式
      if (this.mapClusters) this.handleMarkerCluster();
      // 激活对应的poi
      if (poi) {
        const markerId = markers.findIndex(row => row.uid === poi.uid);
        if (markerId >= 0) this.handleMarkerTap({ detail: { markerId } });
      }
    },
    /**
     * marker加工
     * @param pois Array
     * @return markers Array
     */
    handleMarkersFactory(data) {
      if (!data || !Array.isArray(data)) return [];
      const { isIphone } = this.systemInfo;
      return data.map((row, index) => {
        if (row.distanceNew && row.distanceNew > 1000) {
          row.distance = `${Number((row.distanceNew / 1000).toFixed(2))}km`;
        }
        const fontSize = 12; const padding = 5;
        const poiName = row.shortname || row.name;
        const labelX =  -(poiName.length * fontSize + padding * 2) / 2;
        const markObj = {
          width: 62,
          height: 60,
          ...row,
          ...row.point,
          id: index,
          zIndex: 1, // 显示层级
          joinCluster: this.mapClusters, // 点聚合
          iconPath: row.has_audio === 1 // 是否有音频 1有，0没有
              ? `${this.app.hosts.cos}/wanda/images/marker-icon/marker-voice.png`
              : this.markerIcon,
          label: {
            bgColor: '#fff',
            color: this.theme.default,
            content: poiName,
            padding,
            fontSize,
            borderRadius: 4,
            textAlign: 'center',
            anchorX: isIphone ? 0 : labelX,
            anchorY: 0,
            ...row.label,
          },
          customCallout: {
            display: 'ALWAYS',
          },
        };
        if (this.mapType === 'polyline') {
          markObj.width = 28;
          markObj.height = 28;
          markObj.iconPath = `${this.app.hosts.cos}/wanda/images/route-icon/${index + 1}.png`;
          markObj.label.anchorY = 5;
        }
        if (markObj.name) delete markObj.name;
        return markObj;
      });
    },
    /**
     * 移动某点到视野中央，默认取值第一个marker点
     */
    handleMoveToLocation(markerId = 0, point) {
      const { latitude, longitude } = point ? point : this.map.markers[markerId];
      this.map.latitude = latitude;
      this.map.longitude = longitude;
      if (latitude && longitude) this.mapCtx.moveToLocation({ latitude, longitude });
      this.mapCtx.getScale({
        success: (res) => {
          console.log(res);
        },
      });
    },
    /**
     * marker点击
     */
     handleMarkerTap(e) {
      const { markerId } = e.detail;
      const { name, full_intro, intro, ...others } = this.map.markers[markerId];
      let {
        width,
        height,
        uid, // poi id
        show,
      } = others;
      if (this.mapType === 'polyline') {
        width = 52;
        height = 50;
        others.label.anchorY = -3;
        others.iconPath = others.has_audio === 1 // 是否有音频 1有，0没有
            ? `${this.app.hosts.cos}/wanda/images/marker-icon/marker-voice.png`
            : this.markerIcon;
      }
      // marker激活并调整icon/缩略图大小
      if (!show) {
        // 停车模块
        if (this.showPark) {
          this.handleMarkerReset(markerId);
          this.map.markers[markerId] = {
            ...this.map.markers[markerId],
            width: width * 1.6,
            height: height * 1.6,
            show: true,
          };
          // 强制更新数据
          this.$forceUpdate();
          // 移动到视野中央
          this.handleMoveToLocation(markerId);
          this.$emit('markertap', e);
        } else {
          if (this.loading.playing) this.backgroundAudioManager.stop();
          this.handleMarkerReset(markerId);
          // poi详情
          this.poiDetail({
            scenicid: uid,
          }).then(() => {
            if (this.poi.name) delete this.poi.name;
            // 手动计算距离
            if (this.user.latitude && this.user.longitude) {
              const startPos = { latitude: this.user.latitude, longitude: this.user.longitude };
              const endPos = {
                latitude: this.poi.latitude || this.poi.point && this.poi.point.latitude,
                longitude: this.poi.longitude || this.poi.point && this.poi.point.longitude,
              };
              this.poi.distance = distanceUnit(getDistance(startPos, endPos));
            }
            this.map.markers[markerId] = {
              ...others,
              ...this.poi,
              width: width * 1.4,
              height: height * 1.4,
              show: true,
            };
            // 强制更新数据
            this.$forceUpdate();
            this.map.cardHeight = this.poi.full_intro ? 320 : 220;
            //
            this.feedback.marker = true;
          });
          // 移动到视野中央
          this.handleMoveToLocation(markerId);
        }
      }
    },
    /**
     * marker聚合相关
     */
    handleMarkerCluster() {
      this.mapCtx.initMarkerCluster({
        enableDefaultStyle: false,
        zoomOnClick: true,
        gridSize: this.map.clusterStyle?.gridSize || 40,
        complete(res) {
          console.log('initMarkerCluster', res);
        },
      });
      // 聚合簇点击事件
      this.mapCtx.on('markerClusterClick', (res) => {
        // 展开被聚合的marker并自动缩放在当前视野
        const { markerIds } = res.cluster;
        if (markerIds && Array.isArray(markerIds)) {
          this.handleMarkerIncludePoints(markerIds.map(row => this.map.markers[row]));
          // reset
          this.map.markers = deepClone(this.map.markersCache);
          if (this.feedback.marker) this.feedback.marker = false;
        }
      });
      // enableDefaultStyle 为 true 时不会触发改事件
      this.mapCtx.on('markerClusterCreate', (res) => {
        const { clusters } = res;
        const { isIphone } = this.systemInfo;
        const markers = clusters.map((cluster) => {
          const {
            center,
            clusterId,
            markerIds,
          } = cluster;
          return {
            ...center,
            width: 51,
            height: 58,
            clusterId, // 必须
            iconPath: this.caches.markerClusterBg,
            zIndex: 2, // 显示层级，高于普通marker
            label: {
              content: `${markerIds.length}`,
              textAlign: 'center',
              color: this.mapClusterStyle.color || this.theme.default,
              fontSize: 20,
              anchorX: isIphone ? 0 : (markerIds.length > 9 ? -11 : -6),
              anchorY: -40,
            },
          };
        });
        this.mapCtx.addMarkers({
          markers,
          clear: false,
          complete(res) {
            console.log('clusterCreate addMarkers', res);
          },
        });
      });
    },
    // reset
    resetMarkers() {
      this.map.markers = deepClone(this.map.markersCache);
      this.animation.cancel = true;
      setTimeout(() => {
        this.animation.cancel = false;
        this.feedback.marker = false;
      }, 240);
    },
    handleMapClickTap(e) {
      if (this.mapDisable) return;
      this.resetMarkers();

      this.$emit('maptap', e);
    },
    handleSwiperChange(e) {
      const curId = e.detail.current;
      const curItem = {
        detail: {
          markerId: curId,
        },
      };
      this.handleMarkerTap(curItem);
    },
    /**
     * marker模式下缩放视野展示所有经纬度
     */
    handleMarkerIncludePoints(points = []) {
      this.mapCtx.includePoints({
        points,
        padding: [60, 50, 60, 50],
        success: () => {
          console.log('success');
        },
        fail: () => {
          console.log('fail');
        },
      });
    },
    /**
     * marker reset
     */
    handleMarkerReset(id) {
      this.map.markers = deepClone(this.map.markersCache);
      this.map.current = id;
    },
    /**
     * 地图渲染更新完成时触发
     */
    handleMapUpdated(e) {

    },
    handleRegionChange(e) {

    },
    /**
     * 语音讲解播放相关
     */
    handleAudioManage(val) {
      const { shortname } = this.map.markers[this.map.current];
      // 未播放
      if (!this.loading.playing && typeof val === 'object') {
        this.loading.playing = true;
        this.backgroundAudioManager.title = shortname;
        this.backgroundAudioManager.src = val.audio;
      } else {
        // 暂停或停止状态
        if (val === 'stop') {
          this.backgroundAudioManager.stop();
        } else {
          this.backgroundAudioManager.pause();
        }
        this.loading.playing = false;
      }
      this.backgroundAudioManager.onCanplay(() => {
        console.log('音频进入可以播放状态');
      });
      this.backgroundAudioManager.onPlay(() => {
        console.log('开始播放');
      });
      this.backgroundAudioManager.onPause(() => {
        console.log('暂停播放');
        this.loading.playing = false;
      });
      this.backgroundAudioManager.onStop(() => {
        console.log('停止播放');
        this.loading.playing = false;
      });
      this.backgroundAudioManager.onEnded(() => {
        console.log('自然播放结束');
        this.loading.playing = false;
      });
      this.backgroundAudioManager.onError((res) => {
        console.log(res);
      });
    },
    handleCommonAction(type, val) {
      const { insideScenic } = this.user;
      switch (type) {
        // 收藏
        case 'collect':
          this.handleCommonRoute('/pages/user/collection/index');
          break;
        // 景点详情
        case 'poi':
          // 跳转景点详情
          if (val.intro || val.full_intro) {
            this.handleCommonRoute(`/pages/poi-info/index?poi=${JSON.stringify(val)}`);
          }
          break;
        // AI助手
        case 'ai':
          this.handleCommonRoute('/pages/ai/home/index');
          break;
        // 定位
        case 'location':
          this.$emit('location', 'location');
          break;
        // 导航(去这里)
        case 'lbs':
          const { shortname, latitude, longitude } = val;
          if (insideScenic) {
            const goToMiniProInfo = {
              latitude,
              longitude,
            };
            this.handleCommonRoute(`/pages/guide/walkline/index?endInfo=${JSON.stringify(goToMiniProInfo)}`);
          } else {
            // 景区外打开腾讯地图+小程序
            const goToMiniProInfo = {
              name: shortname,
              location: {
                lat: latitude,
                lng: longitude,
              },
            };
            uni.navigateToMiniProgram({
              appId: 'wx7643d5f831302ab0',
              path: `pages/multiScheme/multiScheme?endLoc=${  JSON.stringify(goToMiniProInfo)  }&qbMode=0`,
            });
          }
          break;
        default:
          break;
      }
    },
    /**
     * poi收藏
     */
    async handlePoiCollect(item) {
      const { uid, latitude, longitude, shortname, tag, intro  } = item;
      const pic = item.audioInfo.pic;
      const hasAudio = item.audioInfo.audio ? 1 : 0;
      const res = await getPoiCollectSaveSvc({
        poiId: uid,
        lat: latitude,
        lng: longitude,
        pic,
        name: shortname,
        typ: tag,
        intro,
        hasAudio,
        operate: item.isSave ? 0 : 1,
      });
      if (res.ok) {
        this.map.markers[this.map.current].isSave = item.isSave ? 0 : 1;
        this.$forceUpdate();
        uni.showToast({
          mask: true,
          title: item.isSave ? '收藏成功' : '取消收藏',
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped src="./index.scss"></style>
