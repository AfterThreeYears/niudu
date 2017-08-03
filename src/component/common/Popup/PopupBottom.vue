<template>
  <ui-mask @closeCallback="edit">
      <transition name="node">
        <div class="test" v-show="maskState">
          <solt></solt>
        </div>
      </transition>
    </ui-mask>
</template>
<script>
  export default {
    name: 'popup-bottom',
  };
</script>
