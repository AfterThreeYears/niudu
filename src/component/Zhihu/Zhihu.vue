<template>
  <div id="zhihu">
    <ul>
      <li class="zhihu-news" v-for="(lists, key) in news">
        <p>{{key}}</p>
        <div v-for="list in lists">
          <LazyImg
            :src="list.author"
            :alt="list.author"
            class="zhihu-headPic"
          />
          <h2>{{list.title}}</h2>
        </div>
      </li>
    </ul>
    <infinite-scroll
      :is-loading="isLoading"
      :load-err="loadErr"
      :is-end="isEnd"
      @load="handleFetchNews"
    />
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import LazyImg from '@/component/common/LazyImg';
import InfiniteScroll from '@/component/common/InfiniteScroll';
import titleMixin from '@/mixins/title';
import './Zhihu.css';

export default {
  name: 'zhihu',
  data() {
    return {
      isLoading: false,
      isEnd: false,
      loadErr: false,
    };
  },
  asyncData({ store }) {
    store.commit('header/setLoading', true);
    return store.dispatch('zhihu/fetchNews').then(() => {
      store.commit('header/setLoading', false);
    });
  },
  mixins: [titleMixin],
  title() {
    return '知乎日报';
  },
  components: {
    LazyImg,
    InfiniteScroll,
  },
  computed: {
    ...mapState({
      news(state) {
        return state.zhihu.news;
      },
      now(state) {
        return state.zhihu.now;
      },
    }),
  },
  // watch: {
  //   cnodeTopics() {
  //     this.isEnd =  this.cnodeTopics.length < this.limit;
  //   },
  // },
  methods: {
    ...mapActions({
      fetchNews: 'zhihu/fetchNews',
    }),
    ...mapMutations({
      setLoading: 'header/setLoading',
    }),
    handleFetchNews(reload) {
      // return new Promise(async (resolve, reject) => {
      //   this.isLoading = true;
      //   // 重载不增加页数
      //   if (!reload) this.increasePage();
      //   try {
      //     const list = await this.fetchTopics();
      //     this.isLoading = false;
      //     this.loadErr = false;
      //     resolve();
      //     if (list >= this.limit) {
      //       this.isEnd = false;
      //     } else {
      //       // 到底部了
      //       this.isEnd = true;
      //     }
      //   } catch (e) {
      //     //出现错误了
      //     reject();
      //     this.loadErr = true;
      //   }
      // });
    },
  },
};
</script>
