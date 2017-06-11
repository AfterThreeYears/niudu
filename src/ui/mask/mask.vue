<template>
  <transition name="mask">
    <div class="ui-mask" @click="close" v-show="maskState" >
      <slot></slot>
    </div>
  </transition>
</template>

<script>
import './mask.css';

export default {
  name: 'ui-mask',
  props: {
    maskState: {
      type: Boolean,
      default: false,
    },
    closeCallback: {
      type: Function,
    },
  },
  methods: {
    close(e) {
      const isMask = e.target.className.includes('ui-mask');
      if (isMask) {
        this.$emit('closeCallback', false);
      }
    },
  },
};
</script>
