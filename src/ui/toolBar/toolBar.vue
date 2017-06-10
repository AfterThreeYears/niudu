<template>
  <div class="ui-toolBar" :style="{transform: Y}" ref="toolBar">
    <slot></slot>
  </div>
</template>

<script>
import throttle from 'lodash.throttle';
import {letPxGo} from '@/helpers/styles';

export default {
  name: 'toolBar',
  data() {
    return {
      throttleInterval: 16,
      location: 0,
      bottom: 0,
      fontSize: 0,
    };
  },
  mounted() {
    this.initData();
    this.initEvent();
  },
  computed: {
    Y() {
      return `translate3d(0, ${-this.bottom}px, 0)`;
    }
  },
  methods: {
    initEvent() {
      this.throttleTraverseImages = throttle(this.initBar, this.throttleInterval);
      this.$nextTick(() => {
        addEventListener('scroll', this.throttleTraverseImages, false);
      });
    },
    initData() {
      const fontSize = letPxGo(document.querySelector('html').style['fontSize']);
      this.fontSize = this.bottom = -fontSize;
    },
    initBar() {
      // console.log(`this.location: ${this.location}, document.body.scrollTop: ${document.body.scrollTop}`);
      if (this.location - document.body.scrollTop > 0) {
        //  往上 显示
        if ( this.bottom < this.fontSize ) {
          this.bottom = this.bottom + (this.location - document.body.scrollTop);
        } else {
          this.bottom = this.fontSize;
        }
      } else if (document.body.scrollTop - this.location > 0) {
        // 往下
        if (this.bottom > this.fontSize * 2) {
          this.bottom = this.bottom - (document.body.scrollTop - this.location);
        } else {
          this.bottom = this.fontSize * 2;
        }
      }
      this.location = document.body.scrollTop;
    },
  },
  beforeDestroy() {
    removeEventListener('scroll', this.throttleTraverseImages);
  },
}
</script>
<style>
.ui-toolBar {
  width: 100%;
  height: 1rem;
  background: #fff;
  border-top: 1px solid rgb(204, 204, 204);
  position: fixed;
  left: 0;
  bottom: 1rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.ui-toolBar *:active {
  background: #ccc;
}
</style>
