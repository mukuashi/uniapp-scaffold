<template>
	<ad-mask v-model="value" position="bottom" @close="close">
		<view :class="[ prefixCls ]">
			<view :class="[`${prefixCls}-header`]">
				<view v-if="!$slots['tooltip']" :class="[`${prefixCls}-header-text`]">
					{{ toolTip }}
				</view>
				<slot v-else name="tooltip"/>
			</view>
			<view :class="[`${prefixCls}-action`, `${app.prefix}ui-center`]">
				<view :class="[`${prefixCls}-action-icon`]">
					<ad-icon v-if="changeYear" type="arrowhead_left" :color="yearArrowColor" @click="changeYearHandler(0)"></ad-icon>
				</view>
				<view :class="[`${prefixCls}-action-icon`]">
					<ad-icon v-if="changeMonth" type="arrow_left" :color="monthArrowColor" @click="changeMonthHandler(0)"></ad-icon>
				</view>
				<view :class="[`${prefixCls}-action-text`]">{{ showTitle }}</view>
				<view :class="[`${prefixCls}-action-icon`]">
					<ad-icon v-if="changeMonth" type="arrow_right" :color="monthArrowColor" @click="changeMonthHandler(1)"></ad-icon>
				</view>
				<view :class="[`${prefixCls}-action-icon`]">
					<ad-icon v-if="changeYear" type="arrowhead_right" :color="yearArrowColor" @click="changeYearHandler(1)"></ad-icon>
				</view>
			</view>
			<view :class="[`${prefixCls}-week-day`]">
				<view v-for="(item, index) in weekDayZh" :key="index" :class="[`${prefixCls}-week-day-text`]">{{ item }}</view>
			</view>
			<view :class="[`${prefixCls}-content`]">
				<!-- 前置空白部分 -->
				<block v-for="(item, index) in weekdayArr" :key="index">
					<view :class="[`${prefixCls}-content-item`]" />
				</block>
				<view 
          v-for="(item, index) in daysArr" 
          :key="index" 
          :class="[
				  `${prefixCls}-content-item`,
					openDisAbled(year,month,index+1) && `${prefixCls}-content-item-disabled`,
					((mode == 'range' && startYear == `${year}-${month}-${index+1}`) || mode== 'date') && `${prefixCls}-content-start-date`,
					((mode== 'range' && endDate==`${year}-${month}-${index+1}`) || mode == 'date') && `${prefixCls}-content-end-date`
				]" :style="{backgroundColor: getColor(index,1)}" :data-index="index + 1" :data-day="startDay"
				 @tap="dateClick(index)">
					<view :class="[`${prefixCls}-content-item-inner`]" :style="{color: getColor(index,2)}">
						<view>{{ index + 1 }}</view>
					</view>
					<view v-if="mode== 'range' && startDate==`${year}-${month}-${index+1}` && startDate!=endDate" :class="[`${prefixCls}-content-item-tips`]" :style="{color:activeColor}">{{ startText }}</view>
					<view v-if="mode== 'range' && endDate==`${year}-${month}-${index+1}`" :class="[`${prefixCls}-content-item-tips`]" :style="{color:activeColor}">{{ endText }}</view>
				</view>
				<view v-if="bgMonthTips" :class="[`${prefixCls}-content-bg-month`]">{{ month }}</view>
			</view>
			<view :class="[`${prefixCls}-bottom`]">
				<view :class="[`${prefixCls}-bottom-choose`]">
					<text>{{ mode == 'date' ? activeDate : startDate }}</text>
					<text v-if="endDate">至{{ endDate }}</text>
				</view>
        <ad-button
          type='primary'
          shape="circle"
          :bg-color="activeBgColor"
          :custom-style='{
            borderColor: activeBgColor
          }'
          @click.native="btnFix(false)"
        >确定</ad-button>
			</view>
		</view>
	</ad-mask>
</template>

<script>
	/**
	 * calendar 日历
	 * @description 此组件用于单个选择日期，范围选择日期等，日历被包裹在底部弹起的容器中。
	 * @tutorial 参考 http://uviewui.com/components/calendar.html
	 * @property {String} mode 选择日期的模式，date-为单个日期，range-为选择日期范围
	 * @property {Boolean} v-model 布尔值变量，用于控制日历的弹出与收起
	 * @property {Boolean} safe-area-inset-bottom 是否开启底部安全区适配(默认false)
	 * @property {Boolean} change-year 是否显示顶部的切换年份方向的按钮(默认true)
	 * @property {Boolean} change-month 是否显示顶部的切换月份方向的按钮(默认true)
	 * @property {String Number} max-year 可切换的最大年份(默认2050)
	 * @property {String Number} min-year 最小可选日期(默认1950)
	 * @property {String Number} min-date 可切换的最小年份(默认1950-01-01)
	 * @property {String Number} max-date 最大可选日期(默认当前日期)
	 * @property {String Number} 弹窗顶部左右两边的圆角值，单位rpx(默认20)
	 * @property {Boolean} mask-close-able 是否允许通过点击遮罩关闭日历(默认true)
	 * @property {String} month-arrow-color 月份切换按钮箭头颜色(默认#666)
	 * @property {String} year-arrow-color 年份切换按钮箭头颜色(默认#999)
	 * @property {String} color 日期字体的默认颜色(默认#333)
	 * @property {String} active-bg-color 起始/结束日期按钮的背景色(默认theme色)
	 * @property {String Number} z-index 弹出时的z-index值(默认10075)
	 * @property {String} active-color 起始/结束日期按钮的字体颜色(默认#ffffff)
	 * @property {String} range-bg-color 起始/结束日期之间的区域的背景颜色(默认rgba(41,121,255,0.13))
	 * @property {String} range-color 选择范围内字体颜色(默认theme色)
	 * @property {String} start-text 起始日期底部的提示文字(默认 '开始')
	 * @property {String} end-text 结束日期底部的提示文字(默认 '结束')
	 * @property {String} btn-type 底部确定按钮的主题(默认 'primary')
	 * @property {String} toolTip 顶部提示文字，如设置名为tooltip的slot，此参数将失效(默认 '选择日期')
	 * @property {Boolean} closeable 是否显示右上角的关闭图标(默认true)
	 * @example <ad-calendar v-model="show" :mode="mode"></ad-calendar>
	 */
  import app from '@/config';
  import { getHexToRgba } from "@/utils";

	export default {
		name: 'AdCalendar',
		props: {
			// 通过双向绑定控制组件的弹出与收起
			value: {
				type: Boolean,
				default: false,
			},
      dateTime: [Array, String],
			// 是否允许切换年份
			changeYear: {
				type: Boolean,
				default: true,
			},
			// 是否允许切换月份
			changeMonth: {
				type: Boolean,
				default: true,
			},
			// date-单个日期选择，range-开始日期+结束日期选择
			mode: {
				type: String,
				default: 'date',
			},
			// 可切换的最大年份
			maxYear: {
				type: [Number, String],
				default: 2050,
			},
			// 可切换的最小年份
			minYear: {
				type: [Number, String],
				default: 1950,
			},
			// 最小可选日期(不在范围内日期禁用不可选)
			minDate: {
				type: [Number, String],
				default: '1950-01-01',
			},
			/**
			 * 最大可选日期
			 * 默认最大值为今天，之后的日期不可选
			 * 2030-12-31
			 * */
			maxDate: {
				type: [Number, String],
				default: '',
			},
			// 月份切换按钮箭头颜色
			monthArrowColor: {
				type: String,
				default: '#666',
			},
			// 年份切换按钮箭头颜色
			yearArrowColor: {
				type: String,
				default: app.theme.dark,
			},
			// 默认日期字体颜色
			color: {
				type: String,
				default: '#333',
			},
      // 选中|起始结束日期字体颜色
			activeColor: {
				type: String,
				default: '#fff',
			},
			// 选中|起始结束日期背景色，范围内日期字体颜色
			activeBgColor: {
				type: String,
				default: app.theme.default,
			},
			// mode=range时生效，起始日期自定义文案
			startText: {
				type: String,
				default: '开始',
			},
			// mode=range时生效，结束日期自定义文案
			endText: {
				type: String,
				default: '结束',
			},
			// 当前选中日期带选中效果
			isActiveCurrent: {
				type: Boolean,
				default: true,
			},
			// 切换年月是否触发事件 mode=date时生效
			isChange: {
				type: Boolean,
				default: false,
			},
			// 是否显示右上角的关闭图标
			closeable: {
				type: Boolean,
				default: true,
			},
			// 顶部的提示文字
			toolTip: {
				type: String,
				default: '选择日期',
      },
      // 是否展示背景月份大数字
      bgMonthTips: {
				type: Boolean,
				default: false,
			},
		},
		data() {
			return {
        prefixCls: `${app.prefix}-calendar`,
				// 星期几,值为1-7
				weekday: 1,
				weekdayArr: [],
				// 当前月有多少天
				days: 0,
				daysArr: [],
				showTitle: '',
				year: 2020,
				month: 0,
				day: 0,
				startYear: 0,
				startMonth: 0,
				startDay: 0,
				endYear: 0,
				endMonth: 0,
				endDay: 0,
				today: '',
				activeDate: '',
				startDate: '',
				endDate: '',
				isStart: true,
				min: null,
				max: null,
				weekDayZh: ['日', '一', '二', '三', '四', '五', '六'],
			};
		},
		computed: {
			dataChange() {
				return `${this.mode}-${this.minDate}-${this.maxDate}`;
			},
		},
		watch: {
			dataChange(val) {
				this.init();
			},
		},
		created() {
			this.init();
		},
		methods: {
			getColor(index, type) {
				let color = type == 1 ? '' : this.color;
				const day = index + 1;
				const date = `${this.year}-${this.month}-${day}`;
				const timestamp = new Date(date.replace(/\-/g, '/')).getTime();
				const start = this.startDate.replace(/\-/g, '/');
				const end = this.endDate.replace(/\-/g, '/');
				if ((this.isActiveCurrent && this.activeDate == date) || this.startDate == date || this.endDate == date) {
					color = type == 1 ? this.activeBgColor : this.activeColor;
				} else if (this.endDate && timestamp > new Date(start).getTime() && timestamp < new Date(end).getTime()) {
					color = type == 1 ? getHexToRgba(this.activeBgColor,.1) : this.activeBgColor;
				}
				return color;
			},
			init() {
        const { mode, dateTime, minDate, maxDate } = this;
				let now = new Date(); let startDate; let endDate;

        if (Array.isArray(dateTime)) {
          startDate = new Date(dateTime[0]);
          endDate = new Date(dateTime[1]);
        } else if (dateTime) {
          now = new Date(dateTime);
        }
				this.year = now.getFullYear();
				this.month = now.getMonth() + 1;
				this.day = now.getDate();
				this.today = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
        this.activeDate = startDate ? '' : this.today;
				this.min = this.initDate(minDate);
				this.max = this.initDate(maxDate || this.today);
				this.startYear = startDate ? startDate.getFullYear() : 0;
				this.startMonth = startDate ? startDate.getMonth() + 1 : 0;
				this.startDay = startDate ? startDate.getDate() : 0;
				this.endYear = endDate ? endDate.getFullYear() : 0;
				this.endMonth = endDate ? endDate.getMonth() + 1 : 0;
				this.endDay = endDate ? endDate.getDate() : 0;
				this.endDate = endDate ? `${this.endYear}-${this.endMonth}-${this.endDay}` : '';
        this.startDate = startDate ? `${this.startYear}-${this.startMonth}-${this.startDay}` : '';
				this.isStart = true;
				this.changeData();
			},
			// 日期处理
			initDate(date) {
				const fdate = date.split('-');
				return {
					year: Number(fdate[0] || 1920),
					month: Number(fdate[1] || 1),
					day: Number(fdate[2] || 1),
				};
			},
			openDisAbled(year, month, day) {
				let bool = true;
				const date = `${year}/${month}/${day}`;
				// let today = this.today.replace(/\-/g, '/');
				const min = `${this.min.year}/${this.min.month}/${this.min.day}`;
				const max = `${this.max.year}/${this.max.month}/${this.max.day}`;
				const timestamp = new Date(date).getTime();
				if (timestamp >= new Date(min).getTime() && timestamp <= new Date(max).getTime()) {
					bool = false;
				}
				return bool;
			},
			generateArray(start, end) {
				return Array.from(new Array(end + 1).keys()).slice(start);
			},
			formatNum(num) {
				return num < 10 ? `0${  num}` : `${num  }`;
			},
			// 一个月有多少天
			getMonthDay(year, month) {
				const days = new Date(year, month, 0).getDate();
				return days;
			},
			getWeekday(year, month) {
				const date = new Date(`${year}/${month}/01 00:00:00`);
				return date.getDay();
			},
			checkRange(year) {
				let overstep = false;
				if (year < this.minYear || year > this.maxYear) {
					uni.showToast({
						title: '日期超出范围啦~',
						icon: 'none',
					});
					overstep = true;
				}
				return overstep;
			},
			changeMonthHandler(isAdd) {
				if (isAdd) {
					const month = this.month + 1;
					const year = month > 12 ? this.year + 1 : this.year;
					if (!this.checkRange(year)) {
						this.month = month > 12 ? 1 : month;
						this.year = year;
						this.changeData();
					}
				} else {
					const month = this.month - 1;
					const year = month < 1 ? this.year - 1 : this.year;
					if (!this.checkRange(year)) {
						this.month = month < 1 ? 12 : month;
						this.year = year;
						this.changeData();
					}
				}
			},
			changeYearHandler(isAdd) {
				const year = isAdd ? this.year + 1 : this.year - 1;
				if (!this.checkRange(year)) {
					this.year = year;
					this.changeData();
				}
			},
			changeData() {
				this.days = this.getMonthDay(this.year, this.month);
				this.daysArr = this.generateArray(1, this.days);
				this.weekday = this.getWeekday(this.year, this.month);
				this.weekdayArr = this.generateArray(1, this.weekday);
				this.showTitle = `${this.year}年${this.month}月`;
				if (this.isChange && this.mode == 'date') {
					this.btnFix(true);
				}
			},
			dateClick(day) {
				day += 1;
				if (!this.openDisAbled(this.year, this.month, day)) {
					this.day = day;
					const date = `${this.year}-${this.month}-${day}`;
					if (this.mode == 'date') {
						this.activeDate = date;
					} else if (this.startDate != date || this.endDate) {
						const compare = new Date(date.replace(/\-/g, '/')).getTime() < new Date(this.startDate.replace(/\-/g, '/')).getTime();
						if (this.isStart || compare) {
							this.startDate = date;
							this.startYear = this.year;
							this.startMonth = this.month;
							this.startDay = this.day;
							this.endYear = 0;
							this.endMonth = 0;
							this.endDay = 0;
							this.endDate = '';
							this.activeDate = '';
							this.isStart = false;
						} else {
							this.endDate = date;
							this.endYear = this.year;
							this.endMonth = this.month;
							this.endDay = this.day;
							this.isStart = true;
						}
					}
				}
			},
			close() {
				// 修改通过v-model绑定的父组件变量的值为false，从而隐藏日历弹窗
				this.$emit('input', false);
				this.$emit('close');
			},
			getWeekText(date) {
				date = new Date(`${date.replace(/\-/g, '/')} 00:00:00`);
				const week = date.getDay();
				return `星期${  ['日', '一', '二', '三', '四', '五', '六'][week]}`;
			},
			btnFix(show) {
				if (!show) {
					this.close();
				}
				if (this.mode == 'date') {
					const arr = this.activeDate.split('-');
					const year = this.isChange ? this.year : Number(arr[0]);
					const month = this.isChange ? this.month : Number(arr[1]);
					const day = this.isChange ? this.day : Number(arr[2]);
					// 当前月有多少天
					const days = this.getMonthDay(year, month);
					const result = `${year}-${this.formatNum(month)}-${this.formatNum(day)}`;
					const weekText = this.getWeekText(result);
					let isToday = false;
					if (`${year}-${month}-${day}` == this.today) {
						// 今天
						isToday = true;
					}
					this.$emit('change', {
						year,
						month,
						day,
						days,
						result,
						week: weekText,
						isToday,
						// switch: show //是否是切换年月操作
					});
				} else {
					if (!this.startDate || !this.endDate) return;
					const startMonth = this.formatNum(this.startMonth);
					const startDay = this.formatNum(this.startDay);
					const startDate = `${this.startYear}-${startMonth}-${startDay}`;
					const startWeek = this.getWeekText(startDate);

					const endMonth = this.formatNum(this.endMonth);
					const endDay = this.formatNum(this.endDay);
					const endDate = `${this.endYear}-${endMonth}-${endDay}`;
					const endWeek = this.getWeekText(endDate);
					this.$emit('change', {
						startYear: this.startYear,
						startMonth: this.startMonth,
						startDay: this.startDay,
						startDate,
						startWeek,
						endYear: this.endYear,
						endMonth: this.endMonth,
						endDay: this.endDay,
						endDate,
						endWeek,
					});
				}
			},
		},
	};
</script>
<style lang="scss" scoped src="./index.scss"></style>
