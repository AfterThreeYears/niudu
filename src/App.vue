<template>
  <div id="app">
    <my-head v-show="showHead" />
    <div :class="classObject">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import MyHead from '@/component/Head/Head';
import lazyload from '@/libs/lazyload';

export default {
  components: {
    MyHead,
  },
  mounted() {
    lazyload();
  },
  updated() {
    lazyload();
  },
  computed: {
    ...mapState({
      showNav(state) {
        return state.header.showNav;
      },
      showTab(state) {
        return state.header.showTab;
      },
      showHead(state) {
        return state.header.showHead;
      },
    }),
    classObject() {
      const { showHead, showTab, showNav } = this;
      if (!showHead) return { 'main-wrap-body-hide': true };
      if (showNav && !showTab) return { 'main-wrap-body-showNav': true };
      return { 'main-wrap-body-showTab': true };
    },
  },
};
</script>
<style>
  .main-wrap-body-hide {
    padding-top: 0;
  }
  .main-wrap-body-showTab {
    padding-top: 1.64rem;
  }
  .main-wrap-body-showNav {
    padding-top: 0.83rem;
  }
</style>
