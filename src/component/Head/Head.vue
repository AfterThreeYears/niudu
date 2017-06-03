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
    $route({name}) {
      // TODO 回头优化一把
      this.setDisPlay(name);
    },
  },
  mounted() {
    const {name} = this.$route;
    this.setDisPlay(name);
  },
  methods: {
    handleNavigationSelect({url, id}) {
      this.$router.push({
        path: url,
        query: {
          id,
        },
      });
    },
    setDisPlay(name) {
      const tagArr = ['cnode', 'v2ex', 'test'];
      if (tagArr.includes(name)) {
        this.showHead = this.showNav = this.showTab = true;
      } else {
        this.showHead = this.showNav = this.showTab = false;
      }
    },
  },
  computed: {
    index() {
      return +this.$route.query.id || 0;
    }
  },
};
</script>
