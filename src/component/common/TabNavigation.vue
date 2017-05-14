<template>
  <swipe-wrapper
    class="TabNavigation"
  >
    <swipe-item
      v-for="(item, idx) in data"
      :key="idx"
      :class="{ 'TabNavigation-selectedItem': selectedIndex === idx }"
      class="TabNavigation-item"
    >
      <span @click="handleSelect(idx, item.tab)">
        {{item.title}}
      </span>
    </swipe-item>
  </swipe-wrapper>
</template>

<script>
import Vue from 'vue';
import { mapMutations, mapActions } from 'vuex';
import { SwipeWrapper, SwipeItem } from '@/component/common/Swipe';
import './TabNavigation.css';

export default {
  name: 'tab-navigation',

  components: {
    SwipeWrapper,
    SwipeItem,
  },

  props: {
    data: {
      type: Array,
      default() { return []; },
    },
  },

  data() {
    return {
      selectedIndex: 0,
    };
  },

  methods: {
    ...mapActions([
      'fetchTopics',
    ]),
    ...mapMutations([
      'resetPage',
      'setTab',
    ]),
    handleSelect(index, tab) {
      if (this.selectedIndex === index) return; // 当前 tab，跳过
      //
      this.abortRequest();
      this.selectedIndex = index;
      // 设置类型
      this.setTab(tab);
      // 重置page
      this.resetPage();
      this.fetchTopics();
    },
    abortRequest() {
      // TODO 停止请求
    }

  },
};
</script>
