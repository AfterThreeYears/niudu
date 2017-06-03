<template>
  <div id="CNodeDetail">
     <h2 class="CNodeDetail-title">{{detail.title}}</h2>
    <br>
    <div class="CNodeDetail-info">
      <span>发布于 {{detail.create_atStr}}</span>
      <span>作者 {{detail.author.loginname}}</span>
      <span>{{detail.visit_count}} 次浏览</span>
      <span>来自 {{cnodeTagMap[detail.tab]}}</span>
    </div>
    <br>
    <p class="CNodeDetail-replies">{{detailReplyLength}}回复</p>
    <br>
    <hr />
    <br>
    <section v-html="detail.content" class="CNodeDetail-content markdown-body" />
    <br>
    <ul>
      <li
        v-for="(reply, index) in detail.replies"
        :key="index"
        class="CNodeDetail-replyList"
      >
        <div class="CNodeDetail-headPic-wrap">
          <lazy-img
            :src="reply.author.avatar_url"
            :alt="reply.author.avatar_url"
            class="CNodeDetail-headPic"
          />
        </div>
        <section class="CNodeDetail-section">
          <div class="CNodeDetail-section-content">
            <p class="CNodeDetail-loginname">{{reply.author.loginname}}</p>
            <div v-html="reply.content"></div>
            <div>
              <span>{{reply.create_atStr}}</span>
              <span class="CNodeDetail-reply_name">
                <template v-if="reply.reply_name">@</template>{{reply.reply_name}}
              </span>
            </div>
          </div>
          <p class='CNodeDetail-floor'>{{+index + 1}}楼</p>
        </section>
      </li>
    </ul>
    <tool-bar>
      <ui-icon name="alipay" />
    </tool-bar>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions, mapGetters } from 'vuex';
import LazyImg from '@/component/common/LazyImg';
import titleMixin from '@/mixins/title';
import {cnodeTagMap} from '@/config/tabs';
import './CNodeDetail.css';

export default {
  name: 'CNode-detail',
  asyncData({ store, route }) {
    store.commit('header/setLoading', true);
    return store.dispatch('cNodeDetail/fetchTopicsDetail', {
      id: route.params.id,
    }).then(() => {
      store.commit('header/setLoading', false);
    });
  },
  data() {
    return {
      cnodeTagMap,
    };
  },
  async beforeRouteLeave(to, from, next) {
    if (!this.cnodeTopics.length) {
      this.setLoading(true);
      await this.fetchTopics();
      this.setLoading(false);
      next();
    } else {
      next();
    }
  },
  mixins: [titleMixin],
  title() {
    return this.detail.title;
  },
  components: {
    LazyImg,
  },
  computed: {
    ...mapState({
      detail(state) {
        return state.cNodeDetail.detail;
      },
      cnodeTopics(state) {
        return state.cnode.list;
      },
    }),
    ...mapGetters({
      detailReplyLength: 'cNodeDetail/detailReplyLength',
    }),
  },
  methods: {
    ...mapMutations({
      setLoading: 'header/setLoading',
    }),
    ...mapActions({
      fetchTopicsDetail: 'cNodeDetail/fetchTopicsDetail',
      fetchTopics: 'cnode/fetchTopics',
    }),
  },
};
</script>
