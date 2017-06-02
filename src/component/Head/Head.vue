<template>
  <header v-show="showHead" id="header">
    <Navigation
      v-show="showNav"
      :data="navs"
      :index="index"
      @change="handleNavigationSelect"
    />
    <tab-navigation
      v-show="showTab"
      :data="tagArrs"
    />
  </header>
</template>

<script>
import { mapState } from 'vuex';
import nav from '@/config/nav';
import Navigation from '@/component/common/Navigation';
import TabNavigation from '@/component/common/TabNavigation';

export default {
  name: 'header',
  data() {
    return {
      navs: nav,
    };
  },
  components: {
    Navigation,
    TabNavigation,
  },
  methods: {
    handleNavigationSelect({url, id}) {
      this.$router.push({
        path: url,
        query: {
          id,
        },
      });
    }
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
      tagArrs(state) {
        return state.header.tagArrs;
      },
    }),
    index() {
      return +this.$route.query.id || 0;
    }
  },
};
</script>
