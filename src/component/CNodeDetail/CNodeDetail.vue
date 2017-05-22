<template>
  <div id="CNodeDetail">
    <h2 class="CNodeDetail-title">{{detail.title}}</h2>
    <br>
    <hr />
    <br>
    <div class="CNodeDetail-info">
      <span>发布于 {{detail.create_atStr}}</span>
      <span v-if="detail.author">作者 {{detail.author.loginname}}</span>
      <span>{{detail.visit_count}} 次浏览</span>
      <span>来自 {{detail.tab}}</span>
    </div>
    <br>
    <section v-html="detail.content" class="CNodeDetail-content markdown-body" />
    <br>
    <p class="CNodeDetail-replies">{{detailReplyLength}}回复</p>
    <br>
    <ul>
      <li
        v-if="detail.replies"
        v-for="(reply, index) in detail.replies"
        :key="index"
        class="CNodeDetail-replyList"
      >
        <p class="CNodeDetail-loginname">{{reply.author.loginname}}</p>
        <div class="CNodeDetail-headPic-wrap">
          <lazy-img
            :src="reply.author.avatar_url"
            :alt="reply.author.avatar_url"
            class="CNodeDetail-headPic"
          />
        </div>
        <span v-html="reply.content"></span>
        {{reply.create_atStr}}
        <span class="CNodeDetail-reply_name">
          <template v-if="reply.reply_name">@</template>{{reply.reply_name}}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions, mapGetters } from 'vuex';
import LazyImg from '@/component/common/LazyImg';
import titleMixin from '@/mixins/title';
import './CNodeDetail.css';

export default {
  name: 'CNode-detail',
  asyncData({ store, route }) {
    const id = route.params.id;
    return store.dispatch('cNodeDetail/fetchTopicsDetail', {
      id,
    });
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
    }),
    ...mapGetters({
      detailReplyLength: 'cNodeDetail/detailReplyLength',
    }),
  },
  created() {
    this.setHead({
      status: false,
    });
  },
  beforeRouteEnter(to, from, next) {
    // 进入页面之前把store里面的detail清空
    next(async (vm) => {
      if (from.name) {
        vm.setLoading(true);
        const id = to.params.id;
        await vm.fetchTopicsDetail({
          id,
        });
        vm.setLoading(false);
      }
    });
  },
  methods: {
    ...mapMutations({
      setHead: 'header/setHead',
      setTopicsDetail: 'cNodeDetail/setTopicsDetail',
      setLoading: 'header/setLoading',
    }),
    ...mapActions({
      fetchTopicsDetail: 'cNodeDetail/fetchTopicsDetail',
    }),
  },
};
</script>
