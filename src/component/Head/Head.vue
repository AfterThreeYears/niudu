<template>
  <header id="header">
    <Navigation :data="navs"/>
  </header>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import nav from '@/config/nav';
import Navigation from '@/component/common/Navigation';
export default {
  name: 'header',
  data() {
    return {
      navs: nav,
    }
  },
  components: {
    Navigation,
  }
}
</script>
