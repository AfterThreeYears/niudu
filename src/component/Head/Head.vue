<template>
  <header v-show="showHead" id="header">
    <Navigation v-show="showNav" :data="navs" />
    <tab-navigation v-show="showTab" :data="cnodeTagArrs" />
  </header>
</template>

<script>
import { mapState } from 'vuex';
import nav from '@/config/nav';
import { cnodeTagArr } from '@/config/tabs';
import Navigation from '@/component/common/Navigation';
import TabNavigation from '@/component/common/TabNavigation';
export default {
  name: 'header',
  data() {
    return {
      navs: nav,
      cnodeTagArrs: cnodeTagArr,
    }
  },
  components: {
    Navigation,
    TabNavigation
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
  },
}
</script>
