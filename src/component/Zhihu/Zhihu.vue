<template>
  <div id="zhihu">
    <!-- <ReferrerKiller></ReferrerKiller> -->
    <ul>
      <li class="zhihu-news" v-for="(item, index) in news[0]" key="index">
        <p class="zhihu-fixed" ref="fixed">{{item[0]}}</p>
        <div class="zhihu-fixed-bottom"></div>
        <div v-for="(list, idx) in item[1]" key="idx">
          <!-- <span v-html="getImg(list.images[0].replace('https', 'http'))"></span> -->
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
import ReferrerKiller from '@/libs/referrer-killer';
import LazyImg from '@/component/common/LazyImg';
// import ReferrerKiller from '@/component/common/ReferrerKiller';
import InfiniteScroll from '@/component/common/InfiniteScroll';
import titleMixin from '@/mixins/title';
import mix from './mix';
import './Zhihu.css';

export default {
  name: 'zhihu',
  data() {
    return {
      isLoading: false,
      isEnd: false,
      loadErr: false,
      // date: Date.now() - 24 * 60 * 60 * 1000,
      limit: new Date("2013-06-03 00:00:00") * 1,
      day: 24 * 60 * 60 * 1000,
    };
  },
  asyncData({ store }) {
    store.commit('header/setLoading', true);
    return store.dispatch('zhihu/fetchNews').then(() => {
      store.commit('header/setLoading', false);
    });
  },
  mixins: [titleMixin, mix],
  title() {
    return '知乎日报';
  },
  components: {
    LazyImg,
    InfiniteScroll,
    // ReferrerKiller,
  },
  computed: {
    ...mapState({
      news(state) {
        return [state.zhihu.news];
      },
      date(state) {
        return state.zhihu.date;
      }
    }),
  },
  watch: {
    date() {
      this.isEnd =  this.date < this.limit;
    },
  },
  methods: {
    ...mapActions({
      fetchNews: 'zhihu/fetchNews',
    }),
    ...mapMutations({
      setLoading: 'header/setLoading',
    }),
    getImg(url) {
       return ReferrerKiller.imageHtml(url);
    },
    handleFetchNews(reload) {
      return new Promise(async (resolve, reject) => {
        this.isLoading = true;
        // 重载不减少天数
        if (!reload) this.date = this.date - this.day;
        try {
          await this.fetchNews({date: this.date});
          this.isLoading = false;
          this.loadErr = false;
          resolve();
        } catch (e) {
          //出现错误了
          reject();
          this.loadErr = true;
        }
      });
    },
  },
};
</script>
