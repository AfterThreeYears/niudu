<template>
  <div id="V2EX">
    <ul>
      <li class="V2EX-List" v-for="topic in topics">
        <h6 class="text-line-clamp2v V2EX-title">{{topic.title}}</h6>
        <div class="V2EX-detail">
          <div class="clearfix V2EX-detail-info">
            <section class="clearfix V2EX-detail-imgWrap">
              <lazy-img
                :src="topic.author.avatar_url"
                :alt="topic.author.avatar_url"
                class="V2EX-detail-info-img"
              />
            </section>
            <p class="text-ellipsis V2EX-detail-loginname">{{topic.author.loginname}}</p>
            <p class="text-ellipsis V2EX-detail-last_reply_at">{{topic.last_reply_at_str}}</p>
          </div>
          <div class="V2EX-detail-params">
            <p class="V2EX-detail-tab">{{topic.tabStr}}</p>
            <div class="V2EX-detail-count">
              <span class="V2EX-detail-text">
                <span class="V2EX-detail-reply_count">{{topic.reply_count}}</span>/{{topic.visit_count}}
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
import titleMixin from '@/mixins/title';
import loadMore from '@/mixins/loadMore';
import './V2EX.css';

export default {
  name: 'V2EX',
  asyncData({ store }) {
    return store.dispatch('fetchTopics');
  },
  mixins: [titleMixin, loadMore],
  title() {
    return 'V2EX';
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
  methods: {
    ...mapActions([
      'fetchTopics',
    ]),
    ...mapMutations([
      'setPage',
      'setTab',
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
