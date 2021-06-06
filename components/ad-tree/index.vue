<template>
	<view :class="[prefixCls]">
		<view :class="[`${prefixCls}-list`]">
			<block v-for="(item, index) in treeList" :key="index">
				<view
					:class="[
            `${prefixCls}-item`,
            treeParams.border && `${prefixCls}-item-border`,
            item.show && `${prefixCls}-item-show`,
            item.lastRank && `${prefixCls}-item-last`,
            item.selected && `${prefixCls}-item-selected`,
            item.showChild && `${prefixCls}-item-showchild`
          ]"
					:style="{
            paddingLeft: item.rank*16 + 'px',
            zIndex: item.rank*-1 + 50
          }"
				>
          <span @click.stop="handleTreeItemTap(item)">
            {{ item.title }}
            <!-- 0纯景区项目，1区划景区复合项目 -->
            {{
              treeParams.type === 1
              ? (item.children && item.children.length ? `（${item.children.length}）` : '')
              : ''
            }}
          </span>
          <ad-icon
            v-if="item.children"
            size="36"
            type="arrow_bottom"
            :class="[ item.showChild && `${prefixCls}-item-showchild-rotate` ]"
            @click.prevent="handleTreeExpand(item)"
          />
				</view>
			</block>
		</view>
	</view>
</template>
<script>
/*
 * Copyright (c) 2020-Now Asako Studio. All rights reseved.
 * @fileoverview | Tree级组件
 * @Author: mukuashi | mukuashi@icloud.com
 * @version 0.1 | 2020-10-26 // Initial version.
 * @Date: 2020-10-26 14:21:19
 * @Last Modified by: mukuashi
 * @Last Modified time: 2020-12-14 15:46:13
 */
import app from '@/config';

export default {
  name: 'AdTree',
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    // 自定义配置参数
    params: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      app,
      prefixCls: `${app.prefix}-tree`,
      treeList: [],
      treeParams: {
        border: true,
      },
    };
  },
  watch: {
    list(newVal, oldVal) {
      if (oldVal && newVal !== oldVal) {
        const list = [...this.treeList].map((row) => {
          if (row.selected) delete row.selected;
          return row;
        });
        this.treeList = [];
        this.renderTreeList(newVal);
        for (const [index, item] of list.entries()) {
          this.treeList[index] = { ...this.treeList[index], ...item };
        }
      }
    },
  },
  mounted() {
    this.treeParams = {
      ...this.treeParams,
      ...this.params,
    };
    this.renderTreeList(this.list);
  },
  methods: {
    // 扁平化树结构
    renderTreeList(list = [], rank = 0, parentId = []) {
      for (const item of list) {
        this.treeList.push({
          ...item,
          parentId,  // 父级id数组
          rank,  // 层级
          showChild: false,  // 子级是否显示
          show: rank === 0,  // 自身是否显示
        });
        if (Array.isArray(item.children) && item.children.length) {
          const parents = [...parentId];
          parents.push(item.id);
          this.renderTreeList(item.children, rank + 1, parents);
        } else {
          this.treeList[this.treeList.length - 1].lastRank = true;
        }
      }
    },
    // 点击某一item
    handleTreeItemTap(item) {
      this.$emit('on-select', item);
    },
    handleTreeExpand(item) {
      item.showChild = !item.showChild;
      this.treeList.forEach((childItem) => {
        if (!item.showChild) {
          // 隐藏所有子级
          if (!childItem.parentId.includes(item.id)) {
            return;
          }
          if (!childItem.lastRank) {
            childItem.showChild = false;
          }
          childItem.show = false;
        } else {
          if (childItem.parentId[childItem.parentId.length - 1] === item.id) {
            childItem.show = true;
          }
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped src="./index.scss"></style>
