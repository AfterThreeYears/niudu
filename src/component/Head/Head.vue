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
      showHead: false,
      showNav: false,
      showTab: false,
    };
  },
  components: {
    Navigation,
    TabNavigation,
  },
  watch: {
    $route(newVal) {
      const {name} = newVal;
      if (name === 'cnode' || name === 'v2ex' || name === 'test') {
        this.showHead = this.showNav = this.showTab = true;
      } else {
        this.showHead = this.showNav = this.showTab = false;
      }
    },
  },
  mounted() {
    const {name} = this.$route;
    if (name === 'cnode' || name === 'v2ex' || name === 'test') {
      this.showHead = this.showNav = this.showTab = true;
    } else {
      this.showHead = this.showNav = this.showTab = false;
    }
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
    // ...mapState({
    //   showNav(state) {
    //     return state.header.showNav;
    //   },
    //   showTab(state) {
    //     return state.header.showTab;
    //   },
    // }),
    index() {
      return +this.$route.query.id || 0;
    }
  },
};
</script>
