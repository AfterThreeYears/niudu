<template>
  <div class="ui-toolBar" :style="{bottom: bottom + 'px'}" ref="toolBar">
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
        if ( this.bottom < 0 ) {
          this.bottom = this.bottom + (this.location - document.body.scrollTop);
        } else {
          this.bottom = 0;
        }
      } else if (document.body.scrollTop - this.location > 0) {
        // 往下
        if (this.bottom > this.fontSize) {
          this.bottom = this.bottom - (document.body.scrollTop - this.location);
        } else {
          this.bottom = this.fontSize;
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
  width: 10rem;
  height: 1rem;
  background: red;
  position: fixed;
}
</style>
