<template>
  <view :class="[ `${app.prefix}ui-container`,`${app.prefix}ui-list`,'tag' ]">
    <section>
      <ad-card :bordered='false'>
        <template
          slot="title"
          :class="[`${app.prefix}ui-title-badge`]"
        >
          <ad-badge dot :bg-gradient='gradient' />
          <text>主题风格</text>
        </template>
        <view
          v-for="(row,index) in types"
          :key="index"
          class="item"
        >
          <ad-tag
            :maxWidth="attrs.maxWidth"
            :type="row.type"
            :plain="attrs.plain"
            :weight="attrs.weight"
          >{{row.name}}</ad-tag>
        </view>
      </ad-card>
    </section>
    <section>
      <ad-card :bordered='false'>
        <template
          slot="title"
          :class="[`${app.prefix}ui-title-badge`]"
        >
          <ad-badge dot :bg-gradient='gradient' />
          <text>尺寸大小</text>
        </template>
        <view
          v-for="(row,index) in sizes"
          :key="index"
          class="item"
        >
          <ad-tag
            :maxWidth="attrs.maxWidth"
            type="primary"
            :size="row.type"
            :plain="attrs.plain"
            :weight="attrs.weight"
          >{{row.name}}</ad-tag>
        </view>
      </ad-card>
    </section>
    <section>
      <ad-card :bordered='false'>
        <template
          slot="title"
          :class="[`${app.prefix}ui-title-badge`]"
        >
          <ad-badge dot :bg-gradient='gradient' />
          <text>圆角类型</text>
        </template>
        <view
          v-for="(row,index) in shape"
          :key="index"
          class="item"
        >
          <ad-tag
            :maxWidth="attrs.maxWidth"
            type="primary"
            :shape="row.type"
            :plain="attrs.plain"
            :weight="attrs.weight"
          >{{row.name}}</ad-tag>
        </view>
      </ad-card>
    </section>
    <section>
      <ad-card :bordered='false'>
        <template
          slot="title"
          :class="[`${app.prefix}ui-title-badge`]"
        >
          <ad-badge dot :bg-gradient='gradient' />
          <text>超出省略</text>
        </template>
        <view
          class="item"
        >
          <ad-tag
            :maxWidth="attrs.maxWidth"
            type="primary"
            :plain="attrs.plain"
            :weight="attrs.weight"
          >我是一段超长文本，超过指定宽度后会显示三个点
          </ad-tag>
        </view>
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
          <text>最大宽度</text>
          <radio-group @change="val=>handleCommonSwitch(val,'maxWidth')">
            <label
              v-for="(row,index) in maxWidth"
              :key="index"
            >
              <radio :value="row.type" :checked="row.type === attrs.maxWidth" />
              <text>{{row.name}}</text>
            </label>
          </radio-group>
        </view>
        <view :class="[ `${app.prefix}ui-justify`,`${app.prefix}ui-item` ]">
          <text>是否加粗文本</text>
          <switch :checked="attrs.weight" @change="val=>handleCommonSwitch(val,'weight')"/>
        </view>
      </ad-card>
    </section>
  </view>
</template>
<script>
  export default {
    data() {
      return {
        attrs: {
          plain: false,
          weight: false,
          maxWidth: '300',
        },
        sizes: [
          {
            type: 'small',
            name: '小号'
          },
          {
            type: '',
            name: '默认'
          },
          {
            type: 'large',
            name: '大号'
          }
        ],
        types: [
          {
            type: 'default',
            name: '默认'
          },
          {
            type: 'primary',
            name: '主题'
          },
          {
            type: 'success',
            name: '成功'
          },
          {
            type: 'warning',
            name: '警告'
          },
          {
            type: 'error',
            name: '失败'
          }
        ],
        shape: [
          {
            type: 'circle',
            name: '圆角'
          },
          {
            type: 'square',
            name: '平角'
          },
          {
            type: 'fillet',
            name: '默认'
          },
        ],
        maxWidth: [
          {
            type: '100',
            name: '100rpx'
          },
          {
            type: '200',
            name: '200rpx'
          },
          {
            type: '300',
            name: '300rpx'
          }
        ],
      };
    },
    onLoad(options) {
      console.log(options);
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
        title: 'Tag',
        path: 'pages/adui/basic/tag/index',
      };
    },
    methods: {
      handleCommonSwitch(e,type) {
        this.attrs[type] = e.detail.value
        if(['shape'].includes(type)) {
          uni.vibrateShort()
        }
      }
    },
  };
</script>
<style lang="scss" scoped src="./index.scss"></style>
