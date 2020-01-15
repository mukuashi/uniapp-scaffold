<template>
  <view class="author" @click="handleAuthorClick">
    <kp-avatar :image="authorData.avatar" />
    <view class='author-detail'>
      <text class='nickname'>{{authorData.username ||''}}</text>
      <view class='info'>
        {{authorData.date || ''}}
        <text v-if="authorData.place" class='disc'>{{ `· ${authorData.place}` }}</text>
        <text v-if="!authorData.date && !authorData.place">{{ authorData.bio }}</text>
      </view>
    </view>
  </view>
</template>

<style lang="less" scoped src="./index.less"></style>

<script>
import KpAvatar from '../kp-avatar'
export default {
  name:'KpAuthor',
  components: {
    KpAvatar
  },
  props: {
    value: {
      type: Object,
      value: () => {}
    },
    // 路径形式，导航页面，保留当前页面，跳转到应用内的某个页面
    navigator: String
  },
  data() {
		return {

		}
  },
  computed: {
    authorData: function() {
      return this.value
    }
  },
  methods: {
    handleAuthorClick(e) {
      // 指定navigator路径后不再传递父子组件事件
      if(this.navigator) {
        return uni.navigateTo({
          url: this.navigator
        })
      }
      //
      this.$emit('on-navigate',e)
    }
  }
}
</script>
