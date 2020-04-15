<template>
  <view
    class="k-skeleton-container k-skeleton-cmomon"
    :style="{ backgroundColor: backgroundColor }"
  >
    <view
      class="k-skeleton-cmomon k-skeleton-animate"
      v-for="(item,index) in skeletonElements"
      :key="index"
      :style="{
        width: item.width+'px', 
        height:item.height+'px', 
        left: item.left+'px',
        top: item.top+'px',
        backgroundImage: skeletonBgShade(skeletonBgColor),
        borderRadius:getRadius(item.skeletonType,borderRadius)
      }"
    />
    <view
      class="k-skeleton-loading"
      :class="[getLoadingType(skeletonLoading)]"
      v-if="skeletonLoading"
    />
    <!-- 是否使用默认模板，组件内获取数据才会用到默认模板，Page页面里获取数据绑定class或preloadData即可 -->
    <view v-if="skeletonCustomTpl" class="k-skeleton-default">
      <view class="author" v-if="skeletonDefaultTpl.author">
        <view class="tpl tpl-author-avatar"/>
        <text class="tpl tpl-author-text"/>
      </view>
      <view class="nav" v-if="skeletonDefaultTpl.nav&&skeletonDefaultTpl.nav.length">
        <view
          class="tpl"
          v-for="(row,index) in skeletonDefaultTpl.nav"
          :key="index"
          :style="{ width: `${100/skeletonDefaultTpl.nav.length-1}%` }"
        />
      </view>
      <view class="content" v-if="skeletonDefaultTpl.list&&skeletonDefaultTpl.list.length">
        <view
          class="tpl tpl-content"
          v-for="(row,index) in skeletonDefaultTpl.list"
          :key="index"
          :style="{ 
            width: skeletonDefaultTpl.listType==='block' && '100%',
            height: skeletonDefaultTpl.listType==='block' && `${83/skeletonDefaultTpl.list.length}vh`
          }"
        />
      </view>
    </view>
  </view>
</template>
<style lang="less" scoped src="./index.less"></style>
<script>
/*
 * Copyright (c) 2019-Now Asako Studio. All rights reseved.
 * @fileoverview | Skeleton 骨架屏组件，组件内获取数据用默认模板，Page页面里获取数据绑定class或preloadData即可
 * @useage | 需要在业务页面视图层按形状绑定class => k-skeleton-rect（矩形），k-skeleton-circular（圆形），k-skeleton-fillet（圆角矩形）
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2019-12-02 // Initial version.
 * @version 0.2 | 2019-12-06 // circular与DOM元素适配.
 * @Date: 2019-12-02 14:21:19
 * @Last Modified by: mukuashi
 * @Last Modified time: 2020-03-28 01:28:53
 */
const prefixCls = "k-skeleton";

export default {
  name: "KpSkeleton",
  props: {
    //选择器(外层容器)
    selector: {
      type: String,
      default: prefixCls
    },
    //外层容器背景颜色
    backgroundColor: {
      type: String,
      default: "#f8f8f8"
    },
    //骨架元素背景颜色
    skeletonBgColor: {
      type: String,
      default: "#e9e9e9"
    },
    //骨架元素类型：矩形，圆形，带圆角矩形["rect","circular","fillet"]
    //默认所有，根据页面情况进行传值
    //页面对应元素class为：k-skeleton-rect，k-skeleton-circular，k-skeleton-fillet
    //如果传入的值不在下列数组中，则为自定义class值，默认按矩形渲染
    skeletonType: {
      type: Array,
      default() {
        return ["rect", "circular", "fillet"];
      }
    },
    //圆角值，skeletonType=fillet时生效
    borderRadius: {
      type: String,
      default: "4px"
    },
    //骨架屏预生成数据：提前生成好的数据，当传入该属性值时，则不会再次查找子节点信息
    preloadData: {
      type: Array,
      default() {
        return [];
      }
    },
    // 是否使用默认模板，
    skeletonCustomTpl: {
      type: [Boolean, Object],
      default: false
    },
    //loading类型[1-10]
    skeletonLoading: {
      type: [String, Number, Boolean],
      default: false
    }
  },
  created() {
    //如果有预生成数据，则直接使用
    this.isPreload(true);
    // 切到 tpl
    if (this.skeletonCustomTpl) {
      if (typeof this.skeletonCustomTpl === "boolean") {
        this.skeletonDefaultTpl = {
          nav: Array(2).fill(),
          list: Array(6).fill(),
          listType: "inline"
        };
      }
      if (typeof this.skeletonCustomTpl === "object") {
        this.skeletonDefaultTpl = this.skeletonCustomTpl;
      }
    }
  },
  // https://ask.dcloud.net.cn/question/70039 | 百度小程序组件在父级使用v-if不触发onReady、onLoad事件
  mounted() {
    !this.isPreload() && this.selectorQuery();
  },
  data: () => ({
    prefixCls,
    skeletonElements: [],
    skeletonDefaultTpl: {}
  }),
  methods: {
    skeletonBgShade(value) {
      return `linear-gradient(90deg, ${value} 25%, #e6e6e6 37%, ${value} 63%)`;
    },
    getLoadingType: function(type) {
      let value = 1;
      if (type && type > 0 && type < 11) {
        value = type;
      }
      return "k-skeleton-loading-" + value;
    },
    getRadius: function(type, val) {
      let radius = "0";
      if (type === "circular") {
        radius = "100%";
      } else if (type == "fillet") {
        radius = val;
      }
      return radius;
    },
    isPreload(init) {
      let preloadData = this.preloadData || [];
      if (preloadData.length) {
        init && (this.skeletonElements = preloadData);
        return true;
      }
      return false;
    },
    async selectorQuery() {
      let skeletonType = this.skeletonType || [];
      let nodes = [];
      for (let item of skeletonType) {
        let className = `.${this.selector}-${item}`;
        await this.nodesRef(className).then(res => {
          res.forEach(d => {
            // 若 type为 circular 但 DOM为矩形box时，生成骨架元素矩形=>圆形
            if (item === "circular") {
              d.width = d.width > d.height ? d.width : d.height;
              d.height = d.width;
            }
            d.skeletonType = item;
          });
          nodes = nodes.concat(res);
        });
      }
      this.skeletonElements = nodes;
    },
    async nodesRef(className) {
      return await new Promise((resolve, reject) => {
        uni
          .createSelectorQuery()
          .selectAll(className)
          .boundingClientRect(res => {
            if (res) {
              resolve(res);
            } else {
              reject(res);
            }
          })
          .exec();
      });
    }
  }
};
</script>