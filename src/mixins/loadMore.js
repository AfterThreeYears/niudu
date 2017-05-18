import debounce from 'lodash.debounce';
import lazyload from '@/libs/lazyload';

const loadMore = {
  data() {
    return {
      isGlobalEventListened: false,
      viewportDistance: 2000,
      debounceInterval: 100,
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
    this.debounceLoadMore = debounce(checkHeight, this.debounceInterval);
    this.debounceLoadMore();
    if (!this.isGlobalEventListened) {
      window.addEventListener('scroll', this.debounceLoadMore, false);
      this.isGlobalEventListened = true;
    }
  },
  methods: {
    destroy() {
      this.isGlobalEventListened = false;
      window.removeEventListener('scroll', this.debounceLoadMore, false);
    },
  },
  beforeRouteLeave(to, from, next) {
    this.destroy();
    next();
  },
};

export default loadMore;
