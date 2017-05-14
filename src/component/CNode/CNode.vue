<template>
  <div id="CNode">
    <ul>
      <li class="CNode-List" v-for="topic in topics">
        <router-link :to="{ name: 'CNodeDetail', params: { id: topic.id }}">
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
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import LazyImg from '@/component/common/LazyImg';
import titleMixin from '@/mixins/title';
import loadMore from '@/mixins/loadMore';
import './CNode.css';

export default {
  name: 'CNode',
  asyncData({ store }) {
    return store.dispatch('fetchTopics');
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
        return state.cnode.entities;
      },
    }),
  },
  created() {
    this.allShow();
  },
  methods: {
    ...mapActions([
      'fetchTopics',
    ]),
    ...mapMutations([
      'setPage',
      'allShow',
    ]),
    handleFetchTopics() {
      return new Promise((resolve) => {
        this.setPage();
        this.fetchTopics().then(() => {
          resolve();
        });
      });
    },
  },
};
</script>
