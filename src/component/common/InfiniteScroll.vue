<template>
  <div
    v-if="isLoading || loadErr || isEnd"
    class="InfiniteScroll"
  >
    <p v-show="isLoading && !loadErr">正在加载中...</p>
    <p v-show="loadErr" @click="handleReload">网络有点问题,点击重新加载</p>
    <p v-show="isEnd">到底部了</p>
  </div>
</template>
<script>
import './InfiniteScroll.css';
import loadMoreFn from '@/mixins/loadMore';

export default {
  name: 'infinite-scroll',
  mixins: [loadMoreFn],
  props: {
    isLoading: {
      type: Boolean,
      default() { return false; },
    },
    loadErr: {
      type: Boolean,
      default() { return false; },
    },
    isEnd: {
      type: Boolean,
      default() { return false; },
    },
  },
  methods: {
    handleReload() {
      this.autoFetch(true);
    },
    handleFetch(reload) {
      this.$emit('load', reload);
    }
  },
}
</script>
