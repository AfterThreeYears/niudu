<template>
  <div id="app">
    <my-head v-show="showHead" />
    <div class="window-isLoading" v-if="isLoading">
      <img src="~public/images/common/loading.gif" class="window-loadingImage" />
    </div>
    <div :class="classObject" v-else>
      <router-view />
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
  updated() {
    lazyload();
    // console.error('*******************updated*********************');
  },
  created() {
    // console.error('*******************created*********************');
  },
  mounted() {
    lazyload();
    // console.error('*******************mounted*********************');
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
      isLoading(state) {
        return state.header.isLoading;
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
  .window-isLoading {
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
  }

  .window-loadingImage {
    width: .78rem;
    height: .78rem;
  }

</style>
