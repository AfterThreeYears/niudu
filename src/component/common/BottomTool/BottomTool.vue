<template>
  <tool-bar>
    <div class="bottom-tool" @click="prevPage">
      <ui-icon name="left-arrow" />
    </div>
    <div class="bottom-tool" @click="backTop">
      <ui-icon name="left-arrow" class="rotate90" />
    </div>
    <div class="bottom-tool">
      <ui-icon name="edit" />
    </div>
    <div class="bottom-tool">
      <ui-icon name="Copy" />
    </div>
  </tool-bar>
</template>

<script>
import {cancelAnimationFrame, requestAnimationFrame} from '@/helpers/animation';
export default {
  name: 'bottom-tool',
  mounted() {
    addEventListener('mousewheel', () => {
      cancelAnimationFrame(this.requestAnimationFrame);
    }, false)
  },
  methods: {
    prevPage() {
      history.go(-1);
    },
    scroll() {
      const currentScroll = document.body.scrollTop || document.documentElement.scrollTop;
      if (currentScroll > 0) {
        window.scrollTo(0, currentScroll - Math.ceil(currentScroll / 5));
        this.backTop();
      } else {
        cancelAnimationFrame(this.requestAnimationFrame);
      }
    },
    backTop() {
      this.requestAnimationFrame = requestAnimationFrame(this.scroll);
    }
  },
};
</script>

<style>
.bottom-tool {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
