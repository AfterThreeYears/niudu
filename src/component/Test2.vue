<template lang="html">
  <div class="">
    test2
    <p>wengbb等于{{wengbb}}</p>
    <button @click="change">clisk</button>
  </div>
</template>

<script>
export default {
  props: {
    wengbb: {
      default: 0,
    },
  },
  methods: {
    change() {
      this.wengbb = 30;
    }
  }
}
</script>

<style lang="css">
</style>
