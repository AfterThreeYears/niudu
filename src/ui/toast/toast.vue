<template>
  <transition name="pop">
    <div
      class="ui-toast"
      v-show="visible"
      :class="customClass"
      :style="{ 'padding': iconName === '' ? '0.1rem' : '0.2rem' }">
      <ui-icon :name="iconName" v-if="iconName !== ''" />
      <span class="ui-toast-text" :style="{ 'padding-top': iconName === '' ? '0' : '0.1rem' }">{{message}}</span>
    </div>
  </transition>
</template>

<script>
import './toast.css';

export default {
  name: 'ui-toast',
  data() {
    return {
      visible: false,
    };
  },
  props: {
    message: {
      type: String,
      default: '',
    },
    position: {
      tyep: String,
      default: 'middle',
    },
    className: {
      type: String,
      default: ''
    },
    iconName: {
      type: String,
      default: ''
    },
  },
  computed: {
    customClass() {
      const classList = [];
      switch (this.position) {
        case 'top':
          classList.push('ui-toast-top');
          break;
        case 'bottom':
          classList.push('ui-toast-bottom');
          break;
        default:
          classList.push('ui-toast-middle');
      }
      classList.push(this.className);
      return classList.join(' ');
    },
  },
};
</script>
