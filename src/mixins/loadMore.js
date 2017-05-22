import throttle from 'lodash.throttle';
import lazyload from '@/libs/lazyload';

const loadMore = {
  data() {
    return {
      isGlobalEventListened: false,
      viewportDistance: 2000,
      throttleInterval: 100,
      isLoading: false,
      isEnd: false,
      loadErr: false,
    };
  },
  mounted() {
    const hasLoad = () => document.body.scrollTop +
     window.innerHeight + this.viewportDistance >= document.body.clientHeight;
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
      this.isLoading = true;
      this.loadErr = false;
      try {
        this.isEnd = await this.handleFetchTopics(reload);
        this.isLoading = false;
        lazyload();
      } catch (e) {
        this.loadErr = true;
      }
    },
  },
  beforeDestroy() {
    this.destroy();
  },
};

export default loadMore;
