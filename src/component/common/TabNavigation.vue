<template>
  <swipe-wrapper class="TabNavigation">
    <swipe-item
      v-for="(item, idx) in data"
      :key="idx"
      :class="{ 'TabNavigation-selectedItem': selectedIndex === idx }"
      class="TabNavigation-item"
    >
      <span @click="handleSelect(idx, item.tab, item.type)">
        {{item.title}}
      </span>
    </swipe-item>
  </swipe-wrapper>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex';
import lazyload from '@/libs/lazyload';
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
  computed: {
    ...mapState({
      selectedIndex(state) {
        return state.header.subNavIndex;
      }
    }),
  },
  methods: {
    ...mapActions([
      'cnode/fetchTopics',
      'v2exList/fetchTopics',
    ]),
    ...mapMutations({
      setSubNavIndex: 'header/setSubNavIndex',
      resetPage: 'cnode/resetPage',
      csetTab: 'cnode/setTab',
      vsetTab: 'v2exList/setTab',
    }),
    handleSelect(index, tab, type) {
      if (this.selectedIndex === index) return; // 当前 tab，跳过
      this.abortRequest();
      // set index
      this.setSubNavIndex(index);
      // 重置page
      this.resetPage();
      if (type === 'cnode') {
        this.csetTab(tab);
        this['cnode/fetchTopics']();
      } else if (type === 'v2ex') {
        this.vsetTab(tab);
        this['v2exList/fetchTopics']();
      }
    },
    abortRequest() {
      // TODO 停止请求
    },
  },
};
</script>
