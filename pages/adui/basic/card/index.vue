<template>
  <view :class="[ `${app.prefix}ui-container`,'card' ]">
    <section>
      <template
        slot="title"
        :class="[`${app.prefix}ui-title-badge`]"
      >
        <ad-badge dot :bg-gradient='gradient' />
        <text>默认卡片</text>
      </template>
      <view
        class="item item-bottom"
      >
        <ad-card
          :image="app.gallery[0]"
          title="家门口"
          desc="阿烽的日记"
          :bordered="attrs.bordered"
          :loading="attrs.loading"
          :shadow="attrs.shadow"
        >
          <template slot="extra">
            <ad-button
              :type="attrs.follow ? 'default' : 'success'"
              @tap='handleAuthorFollow'>
              {{ `${ attrs.follow ? '已' : ''}关注` }}
            </ad-button>
          </template>
          <view>这些照片拍于距家百米内，然后三五百米处的善法寺，稍远的则是三公里外的健跳码头，滩涂和蛏田最远，约十公里。把这些照片称之为“家门口”，是情真意切的。</view>
        </ad-card>
      </view>
    </section>
    <section>
      <template
        slot="title"
        :class="[`${app.prefix}ui-title-badge`]"
      >
        <ad-badge dot :bg-gradient='gradient' />
        <text>隐藏内容</text>
      </template>
      <view
        class="item item-bottom"
      >
        <ad-card
          :image="app.gallery[0]"
          :showBody="false"
          title="川端康成的少女情结与少女小说"
          desc="川端康成的《雪国》《古都》《千只鹤》等作品最早进入中国读书界是在20世纪的80年代，因其唯美的文字和新感觉派的技巧，还有东洋式的虚无色彩和冷艳的官能描写等，不仅风靡了中国读书界，也成为中国作家争相模仿的对象。而事实上，除了这些笼罩着诺贝尔文学奖光环的纯文学作品，川端还创作了大量面向中小学生的少男少女小说。这本《挚友》就分明在提醒我们，川端文学有着另一张常常被漏视的面孔：温暖，甘美，平易近人，满满的少女趣味。其中的主人公就是我们每天在门前的街角所遇见的邻家少女，不，甚至就是青春时代懵懂而美好的我们自己。"
          :bordered="attrs.bordered"
          :loading="attrs.loading"
          :shadow="attrs.shadow"
        >
          <view>卡片body</view>
        </ad-card>
      </view>
    </section>
    <section>
      <template
        slot="title"
        :class="[`${app.prefix}ui-title-badge`]"
      >
        <ad-badge dot :bg-gradient='gradient' />
        <text>隐藏头像</text>
      </template>
      <view
        class="item item-bottom"
      >
        <ad-card
          title="下沉年代"
          desc="阅读《下沉年代》，如同坐在第一排观看美国梦的午夜葬礼"
          :bordered="attrs.bordered"
          :loading="attrs.loading"
          :shadow="attrs.shadow"
        >
          <view>“这是一个时代苍凉的侧影：受挫的努力，被辜负的信任，凋零的生机，以及日渐黯淡的希望。力透纸背的书写，栩栩如生的人物，呈现了美国三十多年的沧桑巨变，也为当下社会撕裂的悲剧写下了发人深省的前传。”——刘擎，华东师范大学教授</view>
        </ad-card>
      </view>
    </section>
    <section>
      <template
        slot="title"
        :class="[`${app.prefix}ui-title-badge`]"
      >
        <ad-badge dot :bg-gradient='gradient' />
        <text>搭配图标</text>
      </template>
      <view
        class="item item-bottom"
      >
        <ad-card
          icon="cafe"
          imageShape="square"
          title="无限可能"
          desc="世界公认的记忆专家&大脑教练吉姆•奎克（Jim Kwik）首部作品，书中介绍了关于升级大脑、快速学习、人生进阶的系统方法，帮助读者从思维、动力和方法三个维度对自己的学习力进行升级，唤醒超级学习脑，拥有学什么都会的“超能力”。"
          :bordered="attrs.bordered"
          :loading="attrs.loading"
          :shadow="attrs.shadow"
        >
          <view>我们的头脑是我们积累的最大财富和资产。当你阅读《无限可能》的时候，不仅能变得更加聪明，还能够去完成你此前不敢想象的事情。对于想要在学习中脱颖而出，打破思维惯性，加速自我发展的人来说，本书非常具有启发性和实践指导作用。</view>
        </ad-card>
      </view>
    </section>
    <section>
      <template
        slot="title"
        :class="[`${app.prefix}ui-title-badge`]"
      >
        <ad-badge dot :bg-gradient='gradient' />
        <text>序号</text>
      </template>
      <view
        class="item item-bottom"
      >
        <ad-card
          :image="app.gallery[0]"
          badge="1"
          imageShape="square"
          title="明智的孩子"
          desc="遗世之作，惊才绝艳，写于《精怪故事集》《焚舟纪》之后。__ 自由摇摆、歪门邪道的“坏”女郎， 从伦敦到纽约继续跳舞，自由，浪荡…屡次改编搬上舞台，成为英伦经典剧目"
          :bordered="attrs.bordered"
          :loading="attrs.loading"
          :shadow="attrs.shadow"
        >
          <view>生于英国伊斯特本，英国深具独创性的作家之一。写作风格糅合魔幻现实主义、女性主义、哥特风格和寓言色彩于一体。</view>
        </ad-card>
      </view>
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
          <text>是否带边框</text>
          <switch :checked="attrs.bordered" @change="val=>handleCommonSwitch(val,'bordered')"/>
        </view>
        <view :class="[ `${app.prefix}ui-justify`,`${app.prefix}ui-item` ]">
          <text>是否带loading</text>
          <switch :checked="attrs.loading" @change="val=>handleCommonSwitch(val,'loading')"/>
        </view>
        <view :class="[ `${app.prefix}ui-justify`,`${app.prefix}ui-item` ]">
          <text>是否带阴影</text>
          <switch :checked="attrs.shadow" @change="val=>handleCommonSwitch(val,'shadow')"/>
        </view>
      </ad-card>
    </section>
  </view>
</template>
<script>
/*
 * Copyright (c) 2019-Now Asako Studio. All rights reseved.
 * @fileoverview | 基础组件首页
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2021-03-01 // Initial version.
 * @Date:   2021-03-01 14:20:27
 * @Last Modified by: mukuashi
 * @Last Modified time: 2021-03-19 10:26:14
 */
let timeout;

export default {
  data() {
    return {
      attrs: {
        bordered: true,
        shadow: true,
        loading: false,
        follow: false,
      },
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
      title: 'Card',
      path: 'pages/adui/basic/card/index',
    };
  },
  methods: {
    handleCommonSwitch(e,type) {
      this.attrs[type] = e.detail.value
      if(['shape'].includes(type)) {
        uni.vibrateShort()
      }

      if (type === 'loading') {
        wx.showToast({
          title: '3秒后关闭',
          icon: 'loading',
          duration: 1000
        })
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
          this.attrs.loading = false;
        },3000)
      }
    },
    handleAuthorFollow(e) {
      const { follow } = this.attrs
      this.attrs.follow = !follow
    }
  },
};
</script>
<style lang="scss" scoped src="./index.scss"></style>
