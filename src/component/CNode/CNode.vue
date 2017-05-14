<template>
  <div id="CNode">
    <ul>
      <li class="CNode-List" v-for="topic in topics">
        <h6 class="text-line-clamp2v CNode-title">{{topic.title}}</h6>
        <div class="CNode-detail">
          <div class="clearfix CNode-detail-info">
            <section class="clearfix CNode-detail-imgWrap">
              <lazy-img
                :src="topic.author.avatar_url"
                :alt="topic.author.avatar_url"
                class="CNode-detail-info-img"
              />
            </section>
            <p class="text-ellipsis CNode-detail-loginname">{{topic.author.loginname}}</p>
            <p class="text-ellipsis CNode-detail-last_reply_at">{{topic.last_reply_at_str}}</p>
          </div>
          <div class="CNode-detail-params">
            <p class="CNode-detail-tab">{{topic.tabStr}}</p>
            <div class="CNode-detail-count">
              <span class="CNode-detail-text">
                <span class="CNode-detail-reply_count">{{topic.reply_count}}</span>/{{topic.visit_count}}
              </span>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import LazyImg from '@/component/common/LazyImg';
import lazyload from '@/libs/lazyload';
import titleMixin from '@/mixins/title.js';
import loadMore from '@/mixins/loadMore';
import './CNode.css';

export default {
  name: 'CNode',
  data() {
    return {
      page: 1,
      limit: 10,
      tab: 'all',
    };
  },
  asyncData({ store }) {
    return store.dispatch('fetchTopics', {
      page: this.page,
      tab: this.tab,
      limit: this.limit,
      mdrender: false,
    });
  },
  mixins: [titleMixin, loadMore],
  title() {
    return 'CNode';
  },
  components: {
    LazyImg,
  },
  computed: {
    ...mapState({
      topics(state) {
        lazyload();
        return state.cnode.entities;
      }
    })
  },
  methods: {
    ...mapActions([
      'fetchTopics',
    ]),
    handleFetchTopics() {
      return new Promise((resolve) => {
        this.page = this.page += 1;
        this.limit = 20;
        this.fetchTopics({
          page: this.page,
          tab: this.tab,
          limit: this.limit,
          mdrender: true,
        }).then(() => {
          resolve();
        });
      });
    },
  },
};
</script>
