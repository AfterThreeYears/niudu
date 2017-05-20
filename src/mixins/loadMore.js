import throttle from 'lodash.throttle';
import lazyload from '@/libs/lazyload';

const loadMore = {
  data() {
    return {
      isGlobalEventListened: false,
      viewportDistance: 2000,
      throttleInterval: 100,
      isLoading: false,
    };
  },
  mounted() {
    const hasLoad = () => document.body.scrollTop +
     window.innerHeight + this.viewportDistance >= document.body.clientHeight;
    const checkHeight = () => {
      if (hasLoad() && !this.isLoading) {
        this.isLoading = true;
        this.handleFetchTopics().then(() => {
          lazyload();
          this.isLoading = false;
        });
      }
    };
    this.throttleLoadMore = throttle(checkHeight, this.throttleInterval);
    this.throttleLoadMore();
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
  },
  beforeDestroy() {
    this.destroy();
  },
};

export default loadMore;
