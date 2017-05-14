<template>
  <swipe-wrapper
    :remember="true"
    :initX="initX"
    :index="selectedIndex"
    :cursor="true"
    @move="handleMove"
    class="Navigation"
  >
    <swipe-item
      v-for="(item, idx) in data"
      :key="idx"
      :class="{ 'Navigation-selectedItem': selectedIndex === idx }"
      class="Navigation-item"
    >
      <span @click="handleSelect(idx, item.id)">
        {{item.title}}
      </span>
    </swipe-item>
  </swipe-wrapper>
</template>

<script>
import cookie from 'js-cookie';
import Vue from 'vue';
import { SwipeWrapper, SwipeItem } from '@/component/common/Swipe';
import { NAVIGATION_STORAGE_KEY } from '@/constants';
import { encodeStorage, decodeStorage } from '@/helpers/navigation';
import './Navigation.css';

export default {
  name: 'navigation',

  components: {
    SwipeWrapper,
    SwipeItem,
  },

  props: {
    data: {
      type: Array,
      default() { return []; },
    },
    index: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      selectedIndex: this.index || 0,
      initX: this.getSSRIninX(),
    };
  },

  watch: {
    index(val) {
      this.selectedIndex = val;
    },
  },

  methods: {
    handleSelect(index, id) {
      if (this.selectedIndex === index) return; // 当前 tab，跳过

      this.abortRequest();
      this.selectedIndex = index;

      // 防止游标游走卡顿
      Vue.nextTick(() => {
        this.$emit('change', id);
      });
    },

    abortRequest() {
      // window.stop();
    },

    handleMove(x) {
      cookie.set(NAVIGATION_STORAGE_KEY, encodeStorage(this.selectedIndex, x));
    },

    getSSRIninX() {
      const { selectedIndex, x } = decodeStorage(this.$store.state.shared.navigation);
      return selectedIndex !== null && x !== null && this.index === selectedIndex ? x : 0;
    },
  },
};
</script>
