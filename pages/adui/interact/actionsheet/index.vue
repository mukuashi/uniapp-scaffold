<template>
  <view :class="[ `${app.prefix}ui-container`,`${app.prefix}ui-list`,'actionsheet' ]">
    <section v-for="(item,index) in actionsheet.list" :key="index">
      <ad-card :bordered='false'>
        <template
          slot="title"
          :class="[`${app.prefix}ui-title-badge`]"
        >
          <ad-badge dot :bg-gradient='gradient' />
          <text>{{item.name}}</text>
        </template>
        <ad-button 
          type="success" 
          @on-click="handleActionItemChange(true,index)"
        >{{item.btn}}
        </ad-button>
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
          <text>蒙层锁定</text>
          <switch :checked="initValue.locked" @change="val=>handleCommonSwitch(val,'locked')" />
        </view>
        <view :class="[ `${app.prefix}ui-justify`,`${app.prefix}ui-item` ]">
          <text>是否需要取消按钮</text>
          <switch :checked="initValue.isCancel" @change="val=>handleCommonSwitch(val,'isCancel')" />
        </view>
        <view :class="[ `${app.prefix}ui-justify`,`${app.prefix}ui-item` ]">
          <text>浮窗位置</text>
          <radio-group @change="val=>handleCommonSwitch(val,'position')">
          <label
            v-for="(row,index) in positions"
            :key="index"
          >
            <radio :value="row.type" :checked="row.type === actionsheet.list[actionsheet.current].position" />
            <text>{{row.name}}</text>
          </label>
        </radio-group>
        </view>
      </ad-card>
    </section>
    <ad-actionsheet
      v-model="actionsheet.list[actionsheet.current].value"
      :locked="actionsheet.list[actionsheet.current].locked"
      :item-inline="actionsheet.list[actionsheet.current].itemInline"
      :item-list='actionsheet.list[actionsheet.current].itemList'
      :is-cancel="actionsheet.list[actionsheet.current].isCancel"
      :position="actionsheet.list[actionsheet.current].position"
      :tips="actionsheet.list[actionsheet.current].tips"
      :tips-text-style="actionsheet.list[actionsheet.current].tipsTextStyle"
      :tips-image="actionsheet.list[actionsheet.current].tipsImage"
      :tips-image-preview="actionsheet.list[actionsheet.current].tipsImagePreview"
      :cancel-text="actionsheet.list[actionsheet.current].cancelText"
      @confirm="handleActionItemConfirm"
      @cancel="handleActionItemChange(false)"
    />
  </view>
</template>

<script>
// mask init config
const initValue = {
  value: false,
  locked: false,
  isCancel: true,
  itemInline: false,
  position: 'bottom',
  cancelText: '取消'
}

export default {
  data() {
    const { theme } = this.$store.state.app
    return {
      initValue,
      actionsheet: {
        current: 0,
        list: [
          {
            value: true,
            name: '基本使用',
            btn: '默认菜单',
            tips: '默认提示标题，请选择您的浏览身份',
            itemList: [
              {
                text: '设计师'
              },
              {
                text: '摄影师'
              },
              {
                text: '创作者',
              },
              {
                text: '其他'
              }
            ]
          },
          {
            name: '菜单内敛模式',
            btn: '扁平化操作区',
            itemInline: true,
            tips: '操作区呈现横排模式，平铺所有功能列表',
            itemList: [
              {
                text: '确定',
                color: theme.success
              }
            ]
          },
          {
            name: '内容区嵌图模式',
            btn: '图片模式',
            itemInline: true,
            tips: '内容区支持嵌入一张图片',
            tipsImage: 'https://tvax3.sinaimg.cn/crop.4.0.1116.1116.180/967d9727ly8fftw9b3jmmj20v90v0wgq.jpg',
            tipsImagePreview: true,
            itemList: [
              {
                text: '联系我们',
                color: theme.success,
                opentype: 'contact'
              }
            ]
          },
          {
            name: '自定义标题颜色',
            btn: '彩色标题',
            tips: '我是一条彩色标题',
            tipsTextStyle: {
              color: theme.success
            }, 
            itemList: [
              {
                text: '不错',
              }
            ]
          },
          {
            name: '自定义菜单颜色',
            btn: '彩色菜单',
            tips: '删除后无法恢复，您确认要继续？',
            itemList: [
              {
                text: '保存到本地',
                color: theme.success,
              },
              {
                text: '删除',
                color: theme.error,
              }
            ]
          },
          {
            name: '自定义取消文本',
            btn: '个性化关闭',
            cancelText: '个性化关闭',
            itemList: [
              {
                text: '确定',
                color: theme.success,
              }
            ]
          },
          {
            name: '不带提示标题',
            btn: '无标题',
            itemList: [
              {
                text: '确定',
                color: theme.success,
              }
            ]
          },
          {
            name: '更多开放能力',
            btn: '开放能力',
            itemInline: true,
            tips: '支持 Button 现有开放能力',
            itemList: [
              {
                text: '联系我们',
                color: theme.success,
                opentype: 'contact'
              },
              {
                text: '分享',
                color: theme.success,
                opentype: 'share'
              }
            ]
          }
        ]
      },
      positions: [
        {type: 'top', name: '顶部'},
        {type: 'center', name: '居中'},
        {type: 'bottom', name: '底部'}
      ]
    };
  },
  created() {
    this.init()
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
      title: 'Actionsheet',
      path: 'pages/adui/interact/actionsheet/index',
    };
  },
  methods: {
    /**
     * 初始化遮罩配置
     */
    init(value,type) {
      for (const [index, item] of this.actionsheet.list.entries()) {
        this.actionsheet.list[index] = {
          ...this.initValue,
          ...item
        }
        if(type) {
          this.actionsheet.list[index][type] = value
        }
      }
    },
    handleActionItemChange(val,index) {
      if(index !== undefined) this.actionsheet.current = index
      this.$set(this.actionsheet.list[this.actionsheet.current],'value',val)
      this.$forceUpdate()
    },
    handleActionItemConfirm(index) {
      const { current,list } = this.actionsheet
      const title = list[current]?.itemList[index].text || ''
      if (!title) return
      uni.showToast({
        title: `您选择了${title}`,
        icon: 'none',
        duration: 2000
      })
    },
    handleCommonSwitch(e,type) {
      const { value } = e.detail
      this.initValue[type] = value
      this.init(value,type)
      if(['position'].includes(type)) {
        uni.vibrateShort()
      }
    },
  },
};
</script>
<style lang="scss" scoped src="./index.scss"></style>
