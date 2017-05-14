import debounce from 'lodash.debounce';
import lazyload from '@/libs/lazyload';

const loadMore = {
  data() {
    return {
      isGlobalEventListened: false,
      viewportDistance: 888,
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
    const debounceLoadMore = debounce(checkHeight, this.debounceInterval);
    debounceLoadMore();
    if (!this.isGlobalEventListened) {
      window.addEventListener('scroll', debounceLoadMore, false);
      this.isGlobalEventListened = true;
    }
  },
};

export default loadMore;
