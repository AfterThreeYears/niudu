<template>
  <div class="SwipeWrapper-overflow" ref="container">
    <div
      @click="handleClick"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
      class="SwipeWrapper"
    >
      <div
        @transitionend="handleTransitionEnd"
        @webkitTransitionEnd="handleTransitionEnd"
        :style="getContainerStyle()"
        class="SwipeWrapper-container"
        ref="swipeContainer"
      >
        <slot />
      </div>
      <div
        v-if="cursor"
        :style="getContainerStyle()"
        class="SwipeItem-cursor-container"
        ref="cursor"
      >
        <div class="SwipeItem-cursor" :style="repositionCursor"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { getProperties, letPxGo } from '@/helpers/styles';
  import './SwipeWrapper.css';

  let properties;

  export default {
    name: 'swiper-wrapper',

    props: {
      index: {
        type: Number,
        default: 0,
      },

      maxGap: {
        type: Number,
      },

      cursor: {
        type: Boolean,
        default: false,
      },

      remember: {
        type: Boolean,
        default: false,
      },

      initX: {
        type: Number,
        default: 0,
      },
    },

    data() {
      return {
        cursorDatas: [],
        cursorReady: false,
        prevTouchX: 0,
        prevTouchY: 0,
        transformX: this.initX || 0,
        maxTransformX: 0,
        containerWidth: 0,
        noNeedTouchEvent: false,
        maxGapData: this.maxGap,
        ready: false,
        itemReadyCount: 0,
        startScroll: true,
        verticalScrolling: false,
        startTime: null,
        startX: 0,
      };
    },

    computed: {
      ...mapState({
        ua(state) {
          return state.shared.ua;
        },
      }),

      repositionCursor() {
        if (!this.ready) return {};
        const closeTransition = {
          'transition-duration': '0s',
          '-webkit-transition-duration': '0s',
        };
        if (!this.cursorReady) {
          setTimeout(() => {
            this.cursorReady = true;
          }, 500);
        }
        const ele = this.cursorDatas[this.index];
        const span = ele.querySelector('span');
        return {
          [properties.transform]: `translateX(${ele.offsetLeft + span.offsetLeft}px) scaleX(${span.offsetWidth})`,
          ...(!this.cursorReady ? closeTransition : {}),
        };
      },
    },

    watch: {
      index(idx) {
        if (this.ready && this.cursor) {
          if (idx <= 0) {
            this.setTransformX(0);
            return;
          }
          // 全长
          const totalWidth = this.$refs.swipeContainer.offsetWidth;
          // 当前游标位置
          const delta = this.cursorDatas.slice(0, idx)
                          .map(ele => ele.offsetWidth)
                          .reduce((a, b) => a + b, 0);
          // 当前游标宽度
          const cursorWidth = this.cursorDatas[idx].offsetWidth;
          // 容器宽度
          const viewWidth = this.$refs.container.offsetWidth;
          // 游标修正位移
          const offset = viewWidth / 2 - cursorWidth / 2;
          // 计算最终位移
          const transformX = offset - delta;
          // 前后位置修正
          const fixedX = Math.max(Math.min(transformX, 0), viewWidth - totalWidth);
          this.setTransformX(fixedX);
        }
      },
    },

    mounted() {
      if (this.cursor) {
        this.cursorDatas = [].slice.call(this.$refs.swipeContainer.querySelectorAll('.SwipeItem'));
      }
    },

    methods: {
      itemCreated() {
        this.itemReadyCount += 1;

        if (this.$children.length === this.itemReadyCount) {
          this.initSwipe();
        }
      },

      isVerticalScroll(x, y) {
        // magic number, √3
        if (Math.abs(this.prevTouchY - y) > (1.73 * Math.abs(this.prevTouchX - x))) {
          return true;
        }

        return false;
      },

      handleClick() {
        if (this.remember) {
          this.$emit('move', this.transformX);
        }
      },

      handleTouchStart(e) {
        if (!this.ready || this.noNeedTouchEvent) {
          return;
        }

        this.removeTransition();

        const { x, y } = this.getTouchPosition(e);
        this.startTime = new Date();
        this.startX = this.transformX;
        this.prevTouchX = x;
        this.prevTouchY = y;
      },

      handleTouchMove(e) {
        if (!this.ready || this.noNeedTouchEvent) {
          return;
        }

        const { x, y } = this.getTouchPosition(e);
        const isVerticalScroll = this.isVerticalScroll(x, y);

        // 一开始就是纵向移动判定为整个页面的滚动
        if (this.verticalScrolling) {
          return;
        }

        if (this.startScroll) {
          this.startScroll = false;

          if (isVerticalScroll) {
            this.verticalScrolling = true;
            return;
          }
        }

        e.preventDefault();

        let swipeX = this.transformX + x - this.prevTouchX;

        // 前后移动幅度不超过 maxGap
        if (swipeX > 0) {
          swipeX = Math.min(this.maxGapData, swipeX);
        } else {
          swipeX = Math.max(-(this.maxGapData + Math.abs(this.maxTransformX)), swipeX);
        }

        swipeX = this.validTransformX(swipeX);

        this.setTransformX(swipeX);
        this.prevTouchX = x;
        this.prevTouchY = y;
      },

      handleTouchEnd() {
        if (!this.ready || this.noNeedTouchEvent) {
          return;
        }

        this.resetTransition();
        this.addTransition();
        this.startScroll = true;
        this.verticalScrolling = false;

        this.startAutoScroll();

        return true;
      },

      validTransformX(x) {
        if (x > 0) {
          x = Math.min(this.maxGapData, x);
        } else {
          x = Math.max(-(this.maxGapData + Math.abs(this.maxTransformX)), x);
        }

        return x;
      },

      startAutoScroll() {
        const deltaT = new Date() - this.startTime;
        const deltaX = this.transformX - this.startX;
        const v = deltaX / deltaT;

        // 速度一定值或拉到尽头时不滚动
        if (Math.abs(v) < 0.4 || deltaX === 0) {
          return;
        }

        let transformPosition = deltaX + this.transformX;

        if (deltaX > 0) {
          transformPosition = Math.min(0, transformPosition);
        } else {
          transformPosition = Math.max(this.maxTransformX, transformPosition);
        }

        this.setTransformX(transformPosition);
      },

      handleTransitionEnd(ev) {
        if (ev.propertyName !== properties.transform) {
          return;
        }

        this.removeTransition();
      },

      resetTransition() {
        if (this.transformX > 0) {
          this.setTransformX(0);
        }

        // 此时 maxTransformX 为负数
        if (this.maxTransformX > this.transformX) {
          this.setTransformX(this.maxTransformX);
        }
      },

      addTransition() {
        const syncStyle = `${properties.transform} .4s ${this.ua.android ? 'cubic-bezier(0.04, 0.74, 0.36, 1)' : ''}`;
        this.$refs.swipeContainer.style[properties.transition] = syncStyle;
        if (this.cursor) {
          this.$refs.cursor.style[properties.transition] = syncStyle;
        }
      },

      removeTransition() {
        this.$refs.swipeContainer.style[properties.transition] = 'none';
        if (this.cursor) {
          this.$refs.cursor.style[properties.transition] = 'none';
        }
      },

      setTransformX(x) {
        this.transformX = x;
        const syncStyle = `translate(${x}px, 0) translateZ(0)`;
        this.$refs.swipeContainer.style[properties.transform] = syncStyle;
        if (this.cursor) {
          this.$refs.cursor.style[properties.transform] = syncStyle;
        }
      },

      // 由于 vue ssr 导致缺失浏览器环境变量，故延迟变量初始化
      initSwipe() {
        this.ready = true;

        properties = getProperties();

        const wrapperWidth = letPxGo(getComputedStyle(this.$el).width);
        this.containerWidth = letPxGo(getComputedStyle(this.$refs.swipeContainer).width);
        this.maxTransformX = wrapperWidth - this.containerWidth;

        // 内容宽度小于 wrapper 宽度，无需滑动
        if (this.maxTransformX >= 0) {
          this.noNeedTouchEvent = true;
        }

        this.maxGapData = this.getGap();
      },

      getGap() {
        const rem = letPxGo(document.documentElement.style.fontSize);
        let defaultGap;

        if (rem >= 100) {
          defaultGap = 100;
        } else {
          defaultGap = 50;
        }

        return this.maxGapData || defaultGap;
      },

      getTouchPosition(e) {
        return {
          x: e.changedTouches[0].pageX,
          y: e.changedTouches[0].pageY,
        };
      },

      // for ssr render
      getContainerStyle() {
        const value = `translate(${this.initX}px, 0) translateZ(0)`;
        return {
          transform: value,
          '-webkit-transform': value,
        };
      },
    },
  };
</script>
