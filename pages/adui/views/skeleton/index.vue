<template>
  <view :class="[ `${app.prefix}ui-container`,`${app.prefix}ui-list`,'skeleton' ]">
    <section>
      <ad-card :bordered='false'>
        <template
          slot="title"
          :class="[`${app.prefix}ui-title-badge`]"
        >
          <ad-badge dot :bg-gradient='gradient' />
          <text>基本使用</text>
        </template>
        <ul :class="[ prefixCls,'skeleton-box' ]">
          <li class="user">
            <!--${prefixCls}-circle 绘制圆形-->
            <image 
              :class="[ 'user-avatar',`${prefixCls}-circle` ]" 
              :src="app.gallery[0]" 
              mode='widthFix'
            />
            <!--${prefixCls}-fillet 绘制圆角矩形-->
            <view :class="[ 'user-desc',`${prefixCls}-fillet` ]">
               <h1> {{ app.name }}</h1>
               <p>{{ app.author.position }}</p>
            </view>
          </li>
          <li>
            <!--${prefixCls}-rect 绘制矩形-->
            <view 
              v-for="(item,index) in lists" 
              :key="index"
              :class="[ 'user-list',`${prefixCls}-rect` ]"
            >{{item}}
            </view>
          </li>
        </ul>
      </ad-card>
    </section>
    <section>
      <ad-card :bordered='false'>
        <template
          slot="title"
          :class="[`${app.prefix}ui-title-badge`]"
        >
          <ad-badge dot :bg-gradient='gradient' />
          <text>个性化</text>
        </template>
        <view :class="[ `${app.prefix}ui-justify`,`${app.prefix}ui-item` ]">
          <text>骨架屏过渡开关(3s体验)</text>
          <switch :checked="skeleton.loading" @change="val=>handleSwitchChange(val,'loading')"/>
        </view>
      </ad-card>
    </section>
    <ad-skeleton :loading="skeleton.loading" />
  </view>
</template>
<script>

export default {
  data() {
    const { app } = this.$store.state
    return {
      prefixCls: `${app.prefix}-skeleton`,
      skeleton: {
        loading: true
      },
      lists: [
        '君不见，黄河之水天上来，奔流到海不复回。君不见，高堂明镜悲白发，朝如青丝暮成雪。',
        '人生得意须尽欢，莫使金樽空对月',
        '天生我材必有用，千金散尽还复来',
      ],
    }
  },
  onLoad() {
    this.handleLoadingSet()
  },
  onReady() {
    // 初始化分享配置（朋友、朋友圈）
    // #ifndef H5
    uni.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline'],
    });
    // #endif
  },
  onShareAppMessage() {
    return {
      title: 'Skeleton',
      path: 'pages/adui/views/skeleton/index',
    };
  },
  methods: {
    handleLoadingSet() {
      // 通过延时模拟向后端请求数据，2s隐藏骨架屏
      setTimeout(_ => {
        this.skeleton.loading = false;
      }, 3000)
    },
    handleSwitchChange(e,type) {
      const { value } = e.detail
      this.skeleton[type] = value
      this.handleLoadingSet()
    }
  },
};
</script>
<style lang="scss" scoped src="./index.scss"></style>
