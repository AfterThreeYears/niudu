<template>
  <div>
    test1
    <span ref="span"></span>
  </div>
</template>
<script>
  import ReferrerKiller from '@/libs/referrer-killer';

  export default {
    data() {
      return {
        html: 123,
      };
    },
    mounted() {
      // this.$refs.span.innerHTML = this.html;
      // this.$refs.span.innerHTML = ReferrerKiller.imageHtml('http://pic4.zhimg.com/v2-86da69db8f3d4339efaf020fba2a784b.jpg');
    },
  }
</script>
