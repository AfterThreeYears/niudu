<template>
  <div id="app">
    <my-head />
    <div class="main-wrap-body">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
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
}
</script>
<style>
  .main-wrap-body {
    padding-top: .82rem;
  }
</style>
