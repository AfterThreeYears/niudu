import throttle from 'lodash.throttle';
import lazyload from '@/libs/lazyload';

const loadMore = {
  data() {
    return {
      isGlobalEventListened: false,
      viewportDistance: 300,
      throttleInterval: 100,
    };
  },
  mounted() {
    const hasLoad = () => document.body.scrollTop +
     window.innerHeight + this.viewportDistance >= document.body.scrollHeight;
    const checkHeight = () => {
      if (hasLoad() && !this.isLoading && !this.isEnd) {
        this.autoFetch(false);
      }
    };
    this.throttleLoadMore = throttle(checkHeight, this.throttleInterval);
    if (!this.isGlobalEventListened) {
      window.addEventListener('scroll', this.throttleLoadMore, false);
      this.isGlobalEventListened = true;
    }
  },
  methods: {
    destroy() {
      this.isGlobalEventListened = false;
      window.removeEventListener('scroll', this.throttleLoadMore, false);
    },
    async autoFetch(reload) {
      try {
        await this.handleFetch(reload);
        lazyload();
      } catch (e) {
        console.log(e);
      }
    },
  },
  beforeDestroy() {
    this.destroy();
  },
};

export default loadMore;
