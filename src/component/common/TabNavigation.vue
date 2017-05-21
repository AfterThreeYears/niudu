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
    ...mapActions({
      cfetchTopics: 'cnode/fetchTopics',
      vfetchTopics: 'v2exList/fetchTopics',
    }),
    ...mapMutations({
      setSubNavIndex: 'header/setSubNavIndex',
      setLoading: 'header/setLoading',
      resetPage: 'cnode/resetPage',
      csetTab: 'cnode/setTab',
      vsetTab: 'v2exList/setTab',
    }),
    async handleSelect(index, tab, type) {
      if (this.selectedIndex === index) return; // 当前 tab，跳过
      this.setLoading(true);
      this.abortRequest();
      // set index
      this.setSubNavIndex(index);
      // 重置page
      this.resetPage();
      if (type === 'cnode') {
        this.csetTab(tab);
        await this.cfetchTopics();
      } else if (type === 'v2ex') {
        this.vsetTab(tab);
        await this.vfetchTopics();
      }
      this.setLoading(false);
    },
    abortRequest() {
      // TODO 停止请求
    },
  },
};
</script>
